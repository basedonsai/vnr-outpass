const ErrorPage = () => {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-3xl font-semibold text-red-500">Access Denied</h2>
        <p className="mt-2">You do not have permission to view this page.</p>
        <a href="/" className="mt-4 text-blue-500 underline">Go back to login</a>
      </div>
    );
  };
  
  export default ErrorPage;
  