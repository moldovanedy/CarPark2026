import "./LoaderComponent.css";

export function LoaderComponent() {
    return (
        <div className="loader__parent">
            <div>
                <img
                    className="loader__spinner"
                    src="/favicon.svg"
                    alt="Site logo"
                    width={56}
                    height={56}
                />

                <span style={{ fontSize: 24 }}>Data is loading...</span>
            </div>
        </div>
    );
}
