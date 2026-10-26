import { motion } from "framer-motion";
import designArc from "./logos/design-arc.webp";
import kiteAviation from "./logos/kite-aviation.png";
import updrive from "./logos/updrive.webp";
import mirai from "./logos/mirai.webp";
import "./ClientRoster.css";

interface Client {
    name: string;
    logo: string;
}

const clients: Client[] = [
    { name: "Design Arc", logo: designArc },
    { name: "Kite aviation", logo: kiteAviation },
    { name: "updrive", logo: updrive },
    { name: "Mirai", logo: mirai },
];

const roster = [...clients, ...clients];

const ClientRoster = () => {
    return (
        <section className="client-roster default-padding" aria-labelledby="client-roster-title">
            <div className="container">
                <motion.div
                    className="site-heading text-center client-roster__heading"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 id="client-roster-title" className="sub-title">Client Roster</h2>
                </motion.div>
            </div>

            <motion.div
                className="client-roster__viewport"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="client-roster__track">
                    {[0, 1].map((copy) => (
                        <ul className="client-roster__set" key={copy} aria-hidden={copy === 1 || undefined}>
                            {roster.map((client, index) => (
                                <li
                                    className="client-roster__card"
                                    key={`${copy}-${client.name}-${index}`}
                                    aria-hidden={index >= clients.length ? true : undefined}
                                >
                                    <div className="client-roster__logo">
                                        <img src={client.logo} alt="" />
                                    </div>
                                    <p className="client-roster__name">{client.name}</p>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default ClientRoster;
