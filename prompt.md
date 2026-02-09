Build a clean, modern, distraction-free demo website for an automotive spare-parts marketplace MVP, similar in spirit to a very simple eBay.

### CONTEXT / USE CASE

The product connects car owners in Dubai with spare-parts dealers in Sharjah.

Some parts are already in stock, while others must be sourced on demand from dealers.

The website serves two purposes:

1. Allow users to browse parts that are already available
2. Allow users to submit a custom request if the part is not listed

This is a  **demo / MVP** , not a production marketplace.

---

### SITE STRUCTURE

#### 1) Parts Catalogue (Default Tab)

* Simple grid or list layout
* Minimal, clean, no ads, no clutter
* Each item should show:
  * Stock image (placeholder / stock photo)
  * Part name
  * Compatible car make / model
  * Price (static demo value)
  * Availability badge (e.g. “In Stock”)
* Data can be mocked locally (JSON or inline)
* No cart, no checkout, no login

The goal is visual clarity and trust, not e-commerce completeness.

---

#### 2) “Can’t Find Your Part?” / Custom Request Tab

A dedicated tab or section where users can submit a custom part request.

The form must be  **very clear and structured** , with labeled inputs:

* Full Name (text)
* Phone Number (text, optional but recommended)
* Car Make (text or dropdown)
* Car Model (text)
* Model Year (number)
* Part Needed (text area, descriptive)

UX goals:

* Make it obvious what information is required
* No free-form chaos
* Mobile friendly inputs

---

### FORM SUBMISSION BEHAVIOR

On submit:

* Validate required fields
* Create a clean JSON payload in this structure:\

```
{
	"name":"",
	"phone":"",
	"car_make":"",
	"model":"",
	"year":"",
	"part":""
}
```

* Send the payload via HTTP POST to a configurable webhook URL (placeholder for now):

```
https://https://0270-111-88-9-100.ngrok-free.app/webhook-test/part-request
```

Show a success screen:

* “We’re checking availability with nearby dealers. You’ll see offers appear here shortly.”

No authentication required.

---

### LIVE / WAITING STATE (BASIC)

After submitting a request:

* Show a simple “waiting for offers” state
* Display a generated Request ID (demo-friendly)
* Prepare the UI so offers could be shown later (even if mocked for now)

Real-time updates are NOT required; polling can be added later.

---

### DESIGN & UX

* Neutral, professional color palette
* Automotive-friendly aesthetic
* Clear typography
* Works well on desktop and mobile
* Touch-friendly on phones

---

### TECHNICAL REQUIREMENTS

* Responsive by default
* Mobile-first layout
* Should be PWA-ready (manifest + basic service worker if supported)
* No heavy frameworks unless necessary
* Clean, readable HTML/CSS/JS or lightweight React if preferred

---

### WHAT NOT TO BUILD

* No login / signup
* No payments
* No dealer dashboard
* No admin panel
* No real inventory management

This is a  **product demo** , not a full platform.

---

### GOAL

The final result should look like a believable early-stage startup MVP that:

* Shows stocked parts clearly
* Lets users submit custom part requests easily
* Feels simple, trustworthy, and realistic
* Can be connected directly to an n8n backend via webhook

Prioritize clarity, simplicity, and demo impact over completeness.
