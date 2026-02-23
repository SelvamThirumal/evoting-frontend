export default function CandidateApprovalCard({ c, approve, remove }){

 return(
  <div className="bg-secondary p-4 rounded-xl text-center shadow">

    {/* QR SAFE */}
    {c.qrCode ? (
      <img src={c.qrCode} className="mx-auto w-20 mb-2"/>
    ):(
      <div className="w-20 h-20 bg-gray-600 mx-auto mb-2 rounded flex items-center justify-center">
        QR
      </div>
    )}

    <h3 className="font-bold">{c.name}</h3>
    <p className="text-sm opacity-80">{c.position}</p>

    <div className="flex justify-center gap-2 mt-3">

      <button
        onClick={()=>approve(c._id)}
        className="bg-success px-3 py-1 rounded text-white">
        Approve
      </button>

      {remove && (
        <button
          onClick={()=>remove(c._id)}
          className="bg-danger px-3 py-1 rounded text-white">
          Delete
        </button>
      )}

    </div>

  </div>
 );
}
