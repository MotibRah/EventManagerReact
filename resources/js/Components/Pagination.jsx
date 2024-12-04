import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    // Function to determine the class names based on the active state of the pagination link
    function getClassName(active) {
        return active
            ? "mr-1 mb-1 px-5 py-3 text-sm font-semibold leading-4 text-white border border-blue-600 rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            : "mr-1 mb-1 px-5 py-3 text-sm font-semibold leading-4 text-blue-600 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
    }

    // Function to replace the special character labels with readable text
    const replaceLabel = (label) => {
        if (label === "&laquo; Previous") return "« Previous";
        if (label === "Next &raquo;") return "Next »";
        return label;
    };

    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8 justify-center space-x-2">
                    {links.map((link, key) =>
                        link.url === null ? (
                            <div
                                key={key}
                                className="mr-1 mb-1 px-5 py-3 text-sm font-semibold leading-4 text-gray-400 border border-gray-300 rounded-lg"
                            >
                                {replaceLabel(link.label)} {/* Replace label if necessary */}
                            </div>
                        ) : (
                            <Link
                                key={key}
                                className={getClassName(link.active)}
                                href={link.url}
                            >
                                {replaceLabel(link.label)} {/* Replace label if necessary */}
                            </Link>
                        )
                    )}
                </div>
            </div>
        )
    );
}
