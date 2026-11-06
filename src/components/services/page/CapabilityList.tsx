interface CapabilityListProps {
    core: string[];
    title: string;
}

const CapabilityList = ({ core, title }: CapabilityListProps) => (
    <div className="services-caps">
        <ul className="services-caps__list" aria-label={`${title} capabilities`}>
            {core.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
);

export default CapabilityList;
