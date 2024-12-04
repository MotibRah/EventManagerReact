import Pagination from "@/Components/Pagination";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Welcome({ auth, events }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEvents = events.data?.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleJoinEvent = (event_id) => {
        Inertia.post(
            route("events.join"),
            { event_id },
            {
                onSuccess: () => alert("Successfully joined the event!"),
                onError: (errors) => alert("Failed to join the event."),
            }
        );
    };
    return (
        <>
            <Head title="Welcome" />
            <ToastContainer />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative">
                    <header className="container mx-auto">
                        <nav className="bg-white border-gray-200 dark:bg-gray-900">
                            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                                <a
                                    href="/"
                                    className="flex items-center space-x-3 rtl:space-x-reverse"
                                >
                                    <img
                                        src="https://flowbite.com/docs/images/logo.svg"
                                        className="h-8"
                                        alt="Flowbite Logo"
                                    />
                                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                        Evento Manager
                                    </span>
                                </a>

                                <div id="navbar-default">
                                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                        {auth.user ? (
                                            <li>
                                                <Link
                                                    href={route("dashboard")}
                                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                        ) : (
                                            <>
                                                <li>
                                                    <Link
                                                        href={route("login")}
                                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                                    >
                                                        Log in
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={route("register")}
                                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                                    >
                                                        Register
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>

                    <div className="bg-white py-8 container mx-auto">
                        <h2 className="text-center text-xl font-semibold text-black">
                            All Events List Here
                        </h2>

                        {/* Search Bar */}
                        <div className="flex justify-center mb-4">
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="border rounded-md p-2 w-1/2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Event List */}
                        <div className="py-12 bg-gray-100">
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            className="p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between h-full"
                                        >
                                            {/* Event Title */}
                                            <h3 className="mb-3 text-xl font-semibold text-gray-800">
                                                {event.title}
                                            </h3>

                                            {/* Event Status */}
                                            <span
                                                className={`mb-4 inline-block px-3 py-1 text-sm font-medium rounded ${
                                                    event.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-green-100 text-green-800"
                                                }`}
                                            >
                                                {event.status === "Pending"
                                                    ? "Coming Soon"
                                                    : "Active"}
                                            </span>

                                            {/* Event Description */}
                                            <p className="mb-4 text-gray-600 line-clamp-5">
                                                {event.description}
                                            </p>

                                            {/* Event Details */}
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">
                                                    Date:
                                                </span>{" "}
                                                {event.startDate}
                                            </p>
                                            <p className="mb-4 text-sm text-gray-500">
                                                <span className="font-semibold">
                                                    Location:
                                                </span>{" "}
                                                {event.location}
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="flex items-center justify-between space-x-4">
                                                <Link
                                                    href={route(
                                                        "events.show",
                                                        event.id
                                                    )}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                                                >
                                                    View
                                                </Link>
                                                {auth.user ? (
                                                    event.is_joined ? (
                                                        <button
                                                            disabled
                                                            className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded cursor-not-allowed"
                                                        >
                                                            Joined
                                                        </button>
                                                    ) : (
                                                        <Link
                                                            href={route(
                                                                "events.join",
                                                                event.id
                                                            )}
                                                            method="post"
                                                            as="button"
                                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                                                            onSuccess={() => {
                                                                toast.success(
                                                                    "Successfully joined the event!"
                                                                );
                                                                event.is_joined = true; // Update the button dynamically
                                                            }}
                                                            onError={() =>
                                                                toast.error(
                                                                    "Failed to join the event!"
                                                                )
                                                            }
                                                        >
                                                            Join
                                                        </Link>
                                                    )
                                                ) : (
                                                    <Link
                                                        href={route("login")}
                                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                                                    >
                                                        Log in to join
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="py-12">
                            <Pagination links={events.links} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
