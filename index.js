const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const GUMROAD_PRODUCT_ID = "fi7K9d-rbsUoeDaPsYFRPg==";

app.post("/verify", async (req, res) => {
    const { license_key } = req.body;
    if (!license_key) return res.status(400).json({ success: false, message: "License key is required." });

    try {
        const gumroadRes = await fetch("https://api.gumroad.com/v2/licenses/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product_id: GUMROAD_PRODUCT_ID,
                license_key: license_key
            })
        });
        const result = await gumroadRes.json();
        res.json(result);
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`DigiProtect API running on port ${PORT}`));
