export default function Loader(){
 return(
  <div className="flex items-center justify-center h-full p-10">

    <div className="flex flex-col items-center">

      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-3 text-sm opacity-70">
        Loading...
      </p>

    </div>

  </div>
 );
}
