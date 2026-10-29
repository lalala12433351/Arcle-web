import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

const interests = ["SEO", "Ads", "Social", "Websites", "Apps", "Automation"];

const ContactStudioForm = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const name = String(data.get("name") || "");
        const email = String(data.get("email") || "");
        const phone = String(data.get("phone") || "");
        const message = String(data.get("message") || "");
        const picked = data.getAll("interest").map(String);
        const lines = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`];
        if (picked.length) lines.push(`Interested in: ${picked.join(", ")}`);
        lines.push("", message);
        const body = lines.join("\n");
        window.location.href = `mailto:info@arcle.in?subject=${encodeURIComponent(`Project enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
        form.reset();
        toast.success("Your email app should open with the message to Arcle.");
    };

    return (
        <form className="cx-form" onSubmit={handleSubmit}>
            <div className="cx-form__grid" data-cx-group>
                <div className="cx-field cx-field--wide" data-cx-reveal>
                    <label htmlFor="cx-name">Name</label>
                    <input id="cx-name" name="name" type="text" placeholder="Your full name" autoComplete="name" required />
                </div>
                <div className="cx-field" data-cx-reveal>
                    <label htmlFor="cx-email">Email</label>
                    <input id="cx-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
                </div>
                <div className="cx-field" data-cx-reveal>
                    <label htmlFor="cx-phone">Phone</label>
                    <input id="cx-phone" name="phone" type="tel" placeholder="+91" autoComplete="tel" required />
                </div>

                <fieldset className="cx-field cx-field--wide cx-interests" data-cx-reveal>
                    <legend>Interested in <span>(optional)</span></legend>
                    <div className="cx-interests__chips">
                        {interests.map((item) => (
                            <label className="cx-chip" key={item}>
                                <input type="checkbox" name="interest" value={item} />
                                <span>{item}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <div className="cx-field cx-field--wide" data-cx-reveal>
                    <label htmlFor="cx-message">Tell us about your project</label>
                    <textarea
                        id="cx-message"
                        name="message"
                        rows={4}
                        placeholder="Where the business is today, and where you want it to be"
                        required
                    />
                </div>

                <div className="cx-form__submit cx-field--wide" data-cx-reveal>
                    <button type="submit" className="cx-btn cx-btn--lg">
                        Send message <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
                    </button>
                    <p>Opens your email app with everything filled in, addressed to info@arcle.in.</p>
                </div>
            </div>
        </form>
    );
};

export default ContactStudioForm;
