import ServiceWallSection from "./ServiceWallSection";
import { findService } from "./serviceWallContent";

const development = findService("Development");

type Token = [className: string, text: string];

const codeLines: Token[][] = [
    [["c", "// app/page.tsx"]],
    [["k", "export default function "], ["t", "Home"], ["", "() {"]],
    [["", "  "], ["k", "return"], ["", " ("]],
    [["", "    <"], ["t", "Hero"], ["", " title="], ["s", "\"Your best salesperson\""], ["", " />"]],
    [["", "    <"], ["t", "Proof"], ["", " clients={clients} />"]],
    [["", "    <"], ["t", "Enquiry"], ["", " cta="], ["s", "\"Book a call\""], ["", " />"]],
    [["", "  );"]],
    [["", "}"]],
];

const ExplodedBuild = () => (
    <div className="svc-dev">
        <div className="svc-dev__rig">
            <div className="svc-dev__layer svc-dev__layer--code">
                <div className="svc-dev__clip">
                    <div className="svc-dev__chrome"><i /><i /><i /></div>
                    <pre className="svc-dev__code">
                        <code>
                            {codeLines.map((line, index) => (
                                <span key={index}>
                                    {line.map(([className, text], tokenIndex) => (
                                        <span className={className || undefined} key={tokenIndex}>{text}</span>
                                    ))}
                                    {"\n"}
                                </span>
                            ))}
                        </code>
                    </pre>
                </div>
                <span className="svc-dev__tag">Code</span>
            </div>

            <div className="svc-dev__layer svc-dev__layer--grid">
                <div className="svc-dev__clip">
                    <div className="svc-dev__wire">
                        <span className="w-chrome" />
                        <span className="w-nav" />
                        <span className="w-hero" />
                        <span className="w-media" />
                        <span className="w-tile" />
                        <span className="w-tile" />
                        <span className="w-tile" />
                    </div>
                </div>
                <span className="svc-dev__tag">Structure</span>
            </div>

            <div className="svc-dev__layer svc-dev__layer--ui">
                <div className="svc-dev__clip">
                    <div className="svc-dev__chrome">
                        <i /><i /><i />
                        <em className="svc-dev__url">yourbrand.com</em>
                    </div>
                    <div className="svc-dev__ui">
                        <div className="svc-dev__nav">
                            <span className="svc-dev__logo" />
                            <i /><i /><i />
                        </div>
                        <div className="svc-dev__hero">
                            <strong>Your best salesperson, online 24/7.</strong>
                            <em>Book a call</em>
                        </div>
                        <div className="svc-dev__media" />
                        <div className="svc-dev__tiles"><i /><i /><i /></div>
                    </div>
                </div>
                <span className="svc-dev__tag">Interface</span>
            </div>
        </div>
    </div>
);

const ServiceDevelopment = () => (
    <ServiceWallSection
        service="development"
        title={development.title}
        summary={development.summary}
        paragraphs={[development.body ?? ""]}
        groups={development.groups}
        visual={<ExplodedBuild />}
        visualLabel="A website splitting into its code, structure and interface layers in 3D, then snapping back together"
        flip
    />
);

export default ServiceDevelopment;
