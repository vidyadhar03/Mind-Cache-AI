import { trackEvent } from "../utils/PageTracking";

export const ChatSessions = ({
  sessions,
  selectedSession,
  onSelectSession,
  toggleSidebar,
  isSidebarOpen,
  setDotClickedSesh,
  showedit,
}) => {
  return (
    <div className="mt-[58px] md:mt-0">
      {sessions.map((session, index) => (
        <div
          key={session._id}
          className={`flex justify-between text-black px-4 py-2 m-1 rounded-lg cursor-pointer hover:bg-second-blue 
    ${
      selectedSession && session._id === selectedSession._id
        ? "bg-second-blue"
        : "bg-first-blue"
    }`}
          onClick={(e) => {
            trackEvent(
              "click",
              "Buttons",
              "Chat Session",
              "Chat session from chat page"
            );
            onSelectSession(session);
            if (isSidebarOpen) toggleSidebar();
            e.stopPropagation();
            // localStorage.setItem("sessionLoaded", JSON.stringify(session));
          }}
        >
          <div className="w-80 overflow-hidden">{session.sessionTitle}</div>
          <div className="min-w-10">
            <img
              src="./3dotlogo.png"
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                trackEvent(
                  "click",
                  "Buttons",
                  "Edit Chat Session",
                  "Edit Chat session from chat page"
                );
                setDotClickedSesh(session);
                showedit();
              }}
              alt="Edit"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
