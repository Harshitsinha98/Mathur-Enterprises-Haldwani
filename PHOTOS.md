# Photos kaise add / badlein / hatayein

Website ki saari photos **`photos.json`** file se aati hain. Har line ka matlab hai **photo ka naam (id) → repo mein photo file**:

```json
"team-rohit-sharma": "team member pic/Rohit Sharma  Service Head.jpg",
```

Compress karna nahi padta. Vercel har deploy pe nayi ya badli hui photos ko apne aap chhota (WebP) kar deta hai.
Saara kaam GitHub website pe browser se ho jata hai.

---

## 1. Kisi member ki photo badalni hai (sabse aasaan)
1. GitHub pe `team member pic` folder kholein → purani file kholein → 🗑 **Delete file** → Commit.
2. **Add file → Upload files** se nayi photo bilkul **usi naam** se upload karein → Commit.
3. Bas. 1–2 minute mein Vercel nayi photo live kar dega.

> Naam alag rakhna ho, to photo upload karein aur `photos.json` mein us member ki line ka file naam badal dein (✏️ edit → Commit).

## 2. Naya team member jodna
1. Photo `team member pic/` mein upload karein, jaise `Ramesh Kumar Solar Adviser.jpg`.
2. `photos.json` kholein → ✏️ → ek nayi line jodein (comma ka dhyan rakhein):
   ```json
   "team-ramesh-kumar": "team member pic/Ramesh Kumar Solar Adviser.jpg",
   ```
3. `src/data/content.ts` kholein → ✏️ → `export const team` mein sahi group mein ek line jodein:
   ```ts
   { name: "Ramesh Kumar", nameHi: "रमेश कुमार", role: { en: "Solar Advisor, Haldwani", hi: "सोलर सलाहकार, हल्द्वानी" }, photo: "team-ramesh-kumar" },
   ```
4. Commit karein. Vercel apne aap update kar dega.

## 3. Member ya photo hatana
- **Sirf photo hatani hai:** `photos.json` se uski line delete karein. Website pe apne aap initials wala avatar aa jayega.
- **Member hi hatana hai:** `src/data/content.ts` mein us member ki poori line `{ name: ... },` delete karein.

## 4. Gallery / solar installation photo jodna
1. Photo `images/` folder mein upload karein.
2. `photos.json` mein nayi line jodein, jaise `"solar-kichha-1": "images/IMG-2026....jpg",`
3. `src/data/content.ts` mein `solarGallery` list mein jodein:
   `{ id: "solar-kichha-1", town: { en: "Kichha", hi: "किच्छा" } },`

---

### Dhyan rakhein
- id mein sirf chhote English akshar, number aur `-` use karein (space nahi).
- `photos.json` mein har line ke end mein comma `,` chahiye, **aakhri line ko chhodkar**.
- Kuch galat ho jaye to GitHub pe deploy ❌ dikhega aur purani website chalti rahegi. Kuch tootega nahi.
- Photo kaisi dikh rahi hai, ye dekhne ke liye Vercel ka **Preview** link khol lein (har commit pe banta hai).
