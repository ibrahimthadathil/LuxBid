import { Outlet } from "react-router-dom";

const Chat = () => {
  return (
    <div className="flex flex-col h-full w-full px-4">
      {/* Render child routes */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;
