import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ event = null }) {
    // Function to manage status color based on the status value
    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-500 text-white"; // Active status is green
            case "Completed":
                return "bg-blue-500 text-white"; // Completed status is blue
            case "Pending":
            default:
                return "bg-yellow-500 text-white"; // Pending status is yellow
        }
    };

    // Function to format the date in a readable format (e.g., "Monday, December 10, 2024")
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Show Event
                </h2>
            }
        >
            <Head title={"Show Event"} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        {/* Event Details Box */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {event.data?.title}
                                </h3>
                                <span
                                    className={`px-4 py-2 rounded-md ${getStatusColor(
                                        event.data?.status
                                    )}`}
                                >
                                    {event.data?.status}
                                </span>
                            </div>

                            {/* Event Description */}
                            <div className="mb-4">
                                <h4 className="text-lg font-medium text-gray-700">
                                    Description
                                </h4>
                                <p className="text-gray-600">
                                    {event.data?.description}
                                </p>
                            </div>

                            {/* Event Date and Location */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700">
                                        Event Date
                                    </h4>
                                    <p className="text-gray-600">
                                        {formatDate(event.data?.startDate)}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700">
                                        Location
                                    </h4>
                                    <p className="text-gray-600">
                                        {event.data?.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-12 lg:px-12">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Joined Users
                        </h2>
                        <hr />
                        {event.data.users && event.data.users.length > 0 ? (
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">
                                            Name
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Email
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event.data.users.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="px-4 py-2">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {user.email}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No events found</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
