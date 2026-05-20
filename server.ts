import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import db from "./backend/db.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Get all products
  app.get("/api/products", (req, res) => {
    try {
      const products = db.prepare("SELECT * FROM products").all();
      // Fetch features for each product
      const productsWithFeatures = products.map((p: any) => {
        const features = db.prepare("SELECT feature FROM product_features WHERE product_id = ?").all(p.id);
        return {
          ...p,
          features: features.map((f: any) => f.feature)
        };
      });
      res.json(productsWithFeatures);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get all orders
  app.get("/api/orders", (req, res) => {
    try {
      const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
      res.json(orders);
    } catch (error) {
       console.error(error);
       res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Admin sync
  app.get("/api/admin", (req, res) => {
     try {
       const user = db.prepare("SELECT id, name, email, role FROM users WHERE role = 'super_admin' LIMIT 1").get();
       res.json(user);
     } catch (error) {
        res.status(500).json({ error: "Failed to fetch admin user" });
     }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
