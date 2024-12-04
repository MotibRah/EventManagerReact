import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";

export default function Joined({ events = null }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {"Joined Events"}
                </h2>
            }
        >
              <ToastContainer />
            <Head title={"Joined Events"} />

            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-12 lg:px-12">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        {events && events.data.length > 0 ? (
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">
                                            Event Name
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Joined Users
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Location
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Date
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Created By
                                        </th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.data.map((event) => (
                                        <tr key={event.id} className="border-b">
                                            <td className="px-4 py-2">
                                                {event.title}
                                            </td>
                                            <td className="px-4 py-2">
                                                {event.usersCount}
                                            </td>
                                            <td className="px-4 py-2">
                                                {event.location}
                                            </td>
                                            <td className="px-4 py-2">
                                                {event.startDate}
                                            </td>
                                            <td className="px-4 py-2">
                                                {event.status}
                                            </td>
                                            <td className="px-4 py-2">
                                                {event.createdBy}
                                            </td>
                                            <td>
                                                <Link
                                                    href={route(
                                                        "events.leave",
                                                        event.id
                                                    )}
                                                    method="get"
                                                    as="button"
                                                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                                                    onClick={(e) => {
                                                        if (
                                                            !window.confirm(
                                                                "Are you sure you want to delete this event?"
                                                            )
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    onSuccess={() => {
                                                        toast.success(
                                                            "Successfully joined the event!"
                                                        );
                                                        event.is_joined = true;
                                                    }}
                                                    onError={() =>
                                                        toast.error(
                                                            "Failed to join the event!"
                                                        )
                                                    }
                                                >
                                                    Leave Event
                                                </Link>
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
