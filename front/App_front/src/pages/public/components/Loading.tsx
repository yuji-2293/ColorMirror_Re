export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p>初期起動に時間がかかることがあります</p>
    </div>
  );
};
