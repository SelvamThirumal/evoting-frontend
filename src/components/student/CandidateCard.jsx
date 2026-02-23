export default function CandidateCard({ c, vote }){

 return(
  <div className="bg-secondary p-4 rounded-xl text-center shadow">

    {/* QR */}
    {c.qrCode ? (
      <img src={c.qrCode} className="mx-auto w-20 mb-2"/>
    ):(
      <div className="w-20 h-20 bg-gray-600 mx-auto mb-2 rounded flex items-center justify-center">
        QR
      </div>
    )}

    <h3 className="font-bold">{c.name}</h3>

    <p className="text-sm opacity-80">
      {c.position}
    </p>

    <p className="text-lg mb-2">
      {c.symbol}
    </p>

    {/* ⭐ FEATURES LIST */}
    <ul className="text-left text-sm mb-3 list-disc ml-4">
      {c.features?.slice(0,3).map((f,i)=>(
        <li key={i}>{f}</li>
      ))}
    </ul>

    {/* VOTE BUTTON */}
    <button
      onClick={()=>vote(c._id,c.position)}
      className="bg-success px-4 py-1 rounded text-white w-full">

      Vote

    </button>

  </div>
 );
}
