import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard({ events }) {
    const [statuses, setStatuses] = useState(
        events.data.reduce((acc, event) => {
            acc[event.id] = event.status; // Initialize status state for each event
            return acc;
        }, {})
    );

    const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown by event ID

    const handleStatusChange = (eventId, newStatus) => {
        // Update status in the local state
        setStatuses((prevStatuses) => ({
            ...prevStatuses,
            [eventId]: newStatus,
        }));

        // Close the dropdown after selecting a status
        setOpenDropdown(null);

        // Optional: Send status change to the server
        console.log(`Event ${eventId} status updated to ${newStatus}`);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Events List
                </h2>
            }
        >
            {" "}
            <ToastContainer />
            <Head title="Events" />
            <div className="py-12"></div>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {events.data.map((event) => (
                            <div
                                key={event.id}
                                className="p-6 bg-white rounded-lg shadow-md flex flex-col justify-between h-full"
                            >
                                {/* Event Title */}
                                <h3 className="mb-2 text-lg font-bold text-gray-800">
                                    {event.title}
                                </h3>

                                {/* Event Description (limited to 5 lines) */}
                                <p className="mb-4 text-sm text-gray-600 line-clamp-5">
                                    {event.description}
                                </p>

                                {/* Event Date and Location */}
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Date:</span>{" "}
                                    {event.startDate}
                                </p>
                                <p className="mb-4 text-sm text-gray-500">
                                    <span className="font-semibold">
                                        Location:
                                    </span>{" "}
                                    {event.location}
                                </p>

                                {/* Buttons and Dropdown */}
                                <div className="flex items-center justify-between space-x-2">
                                    {/* Update Button */}
                                    <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600">
                                        <Link
                                            href={route(
                                                "events.show",
                                                event.id
                                            )}
                                            className="text-white"
                                        >
                                            View
                                        </Link>
                                    </button>
                                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                                        <Link
                                            href={route(
                                                "events.edit",
                                                event.id
                                            )}
                                            className="text-white"
                                        >
                                            Update
                                        </Link>
                                    </button>

                                    {/* Add Button */}

                                    <Link
                                        href={route("events.destroy", event.id)} // Ensure the correct delete route is used
                                        method="delete" // Use method="delete" for event deletion
                                        as="button"
                                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                                        onClick={(e) => {
                                            if (
                                                !window.confirm(
                                                    "Are you sure you want to delete this event?"
                                                )
                                            ) {
                                                e.preventDefault(); // Prevent the delete if the user cancels
                                            }
                                        }}
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
