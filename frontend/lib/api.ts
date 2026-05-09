const BASE_URL = "http://127.0.0.1:8000";

export const aiApi = {
    async fetchIdeas(topic: string, audience: string) {
        const res = await fetch(`${BASE_URL}/generate-ideas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic, target_audience: audience }),
        });
        if (!res.ok) throw new Error("Failed to fetch ideas");
        return res.json();
    },

    async fetchScript(title: string) {
        const res = await fetch(`${BASE_URL}/generate-script`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, tone: "energetic" }),
        });
        if (!res.ok) throw new Error("Failed to fetch script");
        return res.json();
    }
};