interface DataType {
    title?: string;
    thumb?: string;
    thumbLight?: string;
    text?: string;
}

const SingleProcessV1 = ({ process }: { process: DataType }) => {
    const { thumb, title, text, thumbLight } = process

    return (
        <>
            <div className="item">
                <span className="process-step__marker" aria-hidden="true" />
                <div className="icon">
                    <img className="regular-img" src={`/assets/img/icon/${thumb}`} alt="Icon" width={200} height={230} />
                    <img className="light-img" src={`/assets/img/icon/${thumbLight}`} alt="Icon" width={200} height={230} />
                    <img className="regular-img process-step__tint" src={`/assets/img/icon/${thumb}`} alt="" aria-hidden="true" width={200} height={230} />
                    <img className="light-img process-step__tint" src={`/assets/img/icon/${thumbLight}`} alt="" aria-hidden="true" width={200} height={230} />
                </div>
                <h4>{title}</h4>
                <p>{text}</p>
            </div>
        </>
    );
};

export default SingleProcessV1;
