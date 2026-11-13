import FooterV1 from "../footer/FooterV1";
import HeaderV1 from "../header/HeaderV1";

interface LayoutProps {
    children?: React.ReactNode;
    /** White logo / inverted pill while the bar sits over a dark hero. */
    onDarkHero?: boolean;
}

const LayoutV1 = ({ children, onDarkHero = false }: LayoutProps) => {
    return (
        <>
            <div className="smooth-scroll-container">
                <HeaderV1 onDarkHero={onDarkHero} />
                {children}
                <FooterV1 />
            </div>
        </>
    );
};

export default LayoutV1;
