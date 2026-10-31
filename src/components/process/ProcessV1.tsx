import { useId, useRef } from "react";
import ProcessV1Data from "../../../src/assets/jsonData/process/ProcessV1Data.json";
import SingleProcessV1 from "./SingleProcessV1";
import { useProcessSequence } from "./useProcessSequence";
import "./ProcessV1.css";

interface DataType {
    sectionClass?: string
}

const ProcessV1 = ({ sectionClass }: DataType) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const filterId = `process-step-blue-${useId().replace(/:/g, "")}`;
    const { motionOn, mode, active, completeAll } = useProcessSequence(rootRef);

    return (
        <>
            <div
                ref={rootRef}
                className={`process-style-one-items${sectionClass ? ` ${sectionClass}` : ""}${motionOn ? " process-step--motion" : ""}`}
                data-process-mode={mode}
                style={{ ["--step-filter" as string]: `url(#${filterId})` }}
            >
                <svg className="process-step__filters" aria-hidden="true" focusable="false">
                    <filter id={filterId} colorInterpolationFilters="sRGB">
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.13725  0 0 0 0 0.41961  0 0 0 0 1  0 0 0 1 0"
                        />
                    </filter>
                </svg>
                <div className="row">
                    {ProcessV1Data.map((process, index) => {
                        const status = completeAll || (active >= 0 && index < active)
                            ? "is-complete"
                            : index === active
                                ? "is-active"
                                : "";
                        return (
                            <div
                                className={`col-lg-4 col-md-6 process-style-one-item process-step${status ? ` ${status}` : ""}`}
                                data-process-step={index}
                                aria-current={status === "is-active" ? "step" : undefined}
                                key={process.id}
                            >
                                <SingleProcessV1 process={process} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ProcessV1;
