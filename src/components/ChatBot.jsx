import { useState, useRef, useEffect } from "react";
import API from "../services/api";

export default function ChatBot(){

  const [open,setOpen] = useState(false);
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState([
    {from:"bot", text:"Hello 👋 Ask me anything about college or election"}
  ]);

  const endRef = useRef();

  // ================= AUTO SCROLL =================
  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages]);


  // ================= DEFAULT COLLEGE KNOWLEDGE =================
  const defaultCollegeReply = (msg)=>{

    if(msg.includes("course") || msg.includes("department") || msg.includes("cse") || msg.includes("it") || msg.includes("ece") || msg.includes("mech"))
      return "Our college offers various departments like CSE, IT, ECE, MECH and more. Contact admin for details.\n\nElections also have department-wise representatives. Want to know about student elections?";

    if(msg.includes("library"))
      return "📚 Library open from 9AM to 4PM on working days.\n\nVoting awareness camps are sometimes held here during election season!";

    if(msg.includes("hostel"))
      return "🏠 Hostel facilities available for boys & girls. Contact hostel office.\n\nHostel elections happen every year - each wing elects their representative!";

    if(msg.includes("bus") || msg.includes("transport"))
      return "🚌 College transport covers major routes. Visit transport office.\n\nWe also arrange special election shuttles during voting days!";

    if(msg.includes("fee") || msg.includes("fees"))
      return "💰 Fee details available in accounts office or student portal.\n\nElection participation is completely FREE for all students!";

    if(msg.includes("placement") || msg.includes("job"))
      return "🎯 Placement training includes aptitude, coding & soft skills.\n\nLeadership in college elections boosts your resume and placement opportunities!";

    if(msg.includes("hod"))
      return "HOD details available in department notice board.\n\nYour HOD also oversees departmental election processes.";

    if(msg.includes("principal"))
      return "You can meet Principal during office hours.\n\nPrincipal approves all major election committee decisions.";

    if(msg.includes("event") || msg.includes("fest"))
      return "🎉 Cultural & technical events conducted every semester.\n\nElection campaigns are like festivals - posters, speeches, and student engagement!";

    if(msg.includes("teacher") || msg.includes("faculty"))
      return "👨‍🏫 Faculty members are available during working hours.\n\nFaculty coordinators supervise the entire election process.";

    if(msg.includes("exam") || msg.includes("test"))
      return "📝 Exam schedules are posted on the notice board.\n\nElections are scheduled AFTER exam seasons to avoid conflicts.";

    if(msg.includes("canteen") || msg.includes("food"))
      return "🍛 Canteen open 8AM to 6PM.\n\nElection candidates often campaign here during lunch hours!";

    if(msg.includes("sports") || msg.includes("ground"))
      return "⚽ Sports facilities include cricket, football, basketball.\n\nElection rallies and gatherings happen on the main ground.";

    if(msg.includes("lab") || msg.includes("laboratory"))
      return "🧪 All department labs equipped with modern facilities.\n\nVoting machines are tested in labs before elections.";

    return `🤖 I can help with:

🎓 COLLEGE RELATED:
• Courses / Departments  
• Library / Hostel / Bus  
• Fees / Placement  
• Events / Faculty  
• Exams / Sports / Canteen  

🗳️ ELECTION RELATED:
• Result date  
• Features & security  
• Representatives  
• Chairman info  
• Voting process  
• Candidate rules  

What would you like to know? 🙂`;
  };


  // ================= ELECTION KNOWLEDGE =================
  const electionReply = (msg)=>{

    // VOTING PROCESS
    if(msg.includes("vote") || msg.includes("voting") || msg.includes("how to vote") || msg.includes("cast"))
      return "🗳️ Voting Process:\n\n1. Login with your student ID\n2. Verify via OTP/Face\n3. View candidate profiles\n4. Cast your ONE vote\n5. Get QR confirmation\n\nElections are 100% secure and tamper-proof!";

    // CANDIDATE
    if(msg.includes("candidate") || msg.includes("contestant") || msg.includes("stand"))
      return "👥 Candidate Eligibility:\n\n• Minimum 75% attendance\n• No pending dues\n• Good academic standing\n• 10 student proposers\n• Clean disciplinary record\n\nWant to know nomination process?";

    // NOMINATION
    if(msg.includes("nomination") || msg.includes("nominate") || msg.includes("apply"))
      return "📋 Nomination Steps:\n\n1. Fill nomination form\n2. Get HOD signature\n3. Submit with documents\n4. Pay refundable deposit\n5. Campaign after approval\n\nLast date: 5 days before elections";

    // CAMPAIGN
    if(msg.includes("campaign") || msg.includes("promote"))
      return "📢 Campaign Rules:\n\n• No hate speech\n• No personal attacks\n• Posters only in designated areas\n• No campaigning after 8PM\n• No bribes or gifts\n\nViolation = Disqualification!";

    // SECURITY
    if(msg.includes("security") || msg.includes("safe") || msg.includes("fraud") || msg.includes("fake"))
      return "🔒 Election Security Features:\n\n• Blockchain verified votes\n• Biometric/Face login\n• One student = One vote\n• Live audit trail\n• Encrypted databases\n• Tamper-proof results\n\nYour vote is 100% safe!";

    // COMMITTEE
    if(msg.includes("committee") || msg.includes("election commission") || msg.includes("ec"))
      return "⚖️ Election Committee Members:\n\n• Chief Election Officer\n• Faculty Coordinators\n• Technical Team\n• Student Representatives\n• Grievance Officers\n\nThey ensure fair elections!";

    // RULES
    if(msg.includes("rule") || msg.includes("regulation") || msg.includes("code of conduct"))
      return "📜 Election Code of Conduct:\n\n1. No defacement of property\n2. Limited campaign budget\n3. Fair polling practices\n4. No booth capturing\n5. Immediate result acceptance\n\nViolations lead to ban from future elections!";

    // DEBATE
    if(msg.includes("debate") || msg.includes("speech"))
      return "🎤 Candidates Debate:\n\n• Held 2 days before voting\n• 5 mins per candidate\n• Open Q&A session\n• Live stream available\n• All students can attend\n\nGreat way to choose your leader!";

    // COUNTING
    if(msg.includes("counting") || msg.includes("count"))
      return "📊 Vote Counting:\n\n• Starts immediately after polls close\n• Automated digital counting\n• Committee observers present\n• Candidates can witness\n• Results within 2 hours\n\nTransparency guaranteed!";

    return null; // Let default college reply handle it
  };


  // ================= BOT LOGIC =================
  const reply = async(text)=>{

    const msg = text.toLowerCase().trim();

    // GREETINGS
    if(msg === "hi" || msg === "hello" || msg === "hey")
      return "Hi 👋 Ask me anything about college OR elections! I cover both 😊";

    // THANKS
    if(msg.includes("thank") || msg.includes("thanks"))
      return "You're welcome! 😊 Anything else about college or elections?";

    // FUTURE FEATURES
    if(msg.includes("future") || msg.includes("coming soon") || msg.includes("upcoming")){
      return `Upcoming Election Features 🚀

1 Online Voting
2 Face Login
3 Live Analytics
4 Mobile Voting
5 Debate Streaming
6 Blockchain Security
7 Instant Dashboard
8 Fraud Detection
9 Multi-language
10 Digital ID

These will make college elections even better!`;
    }

    // RESULT DATE
    if(msg.includes("result") || msg.includes("results") || msg.includes("winner")){
      try{
        const res = await API.get("/settings/dates");
        return `📢 Election Result Date:\n${res.data.resultDate || "Will be announced soon"}\n\nStay tuned for updates!`;
      }catch{
        return "Result date not announced yet. Check with election committee.";
      }
    }

    // FEATURES
    if(msg.includes("features") || msg.includes("how it works") || msg.includes("system")){
      return `Election System Features 🗳️

✅ Secure digital voting
✅ OTP & Face verification
✅ Candidate photo profiles
✅ QR verification receipt
✅ 5 minute session timer
✅ One vote per student
✅ Complete audit logging
✅ Admin dashboard
✅ Instant result tallying
✅ Zero paper waste

College elections made modern!`;
    }

    // REPRESENTATIVE
    if(msg.includes("rep") || msg.includes("representative") || msg.includes("cr") || msg.includes("class rep")){
      return `Student Representative 👨‍🎓

WHAT THEY DO:
• Voice student concerns
• Share official announcements
• Organize class activities
• Collect academic feedback
• Coordinate with faculty
• Handle minor disputes
• Promote student welfare

INTERESTED?
Nominations open every July & January!`;
    }

    // CHAIRMAN
    if(msg.includes("chairman") || msg.includes("president") || msg.includes("head boy")){
      return `Student Chairman 🏆

RESPONSIBILITIES:
• Lead student council
• Chair all meetings
• Represent college externally
• Oversee all events
• Mentor other representatives
• Liaise with Principal
• Policy recommendations
• Crisis management

Most prestigious student position!`;
    }

    // ELECTION TIMELINE
    if(msg.includes("timeline") || msg.includes("schedule") || msg.includes("when")){
      return `🗓️ Election Timeline:

• Announcement: 2 weeks before
• Nominations: 7 days open
• Scrutiny: 2 days
• Campaign: 5 days
• Debates: 2 days before
• Voting Day: 9AM - 4PM
• Counting: 4PM - 6PM
• Results: 6PM

Mark your calendar!`;
    }

    // CHECK ELIGIBILITY
    if(msg.includes("eligible") || msg.includes("can i contest") || msg.includes("become candidate")){
      return `✅ To become a candidate:

✔️ 75%+ attendance
✔️ No backlog >2 subjects
✔️ CGPA >6.5
✔️ No disciplinary cases
✔️ Not a final semester student
✔️ Paid all fees

Get 10 student signatures and apply!`;
    }

    // FIRST CHECK ELECTION REPLIES
    const electionResponse = electionReply(msg);
    if(electionResponse) return electionResponse;

    // THEN CHECK COLLEGE REPLIES
    return defaultCollegeReply(msg);
  };


  const send = async()=>{
    if(!input) return;

    setMessages(p=>[...p,{from:"user",text:input}]);

    const r = await reply(input);

    setMessages(p=>[...p,{from:"bot",text:r}]);

    setInput("");
  };


  // ================= UI =================
  return (
    <>
      {/* FLOAT ICON */}
      <div
        onClick={()=>setOpen(!open)}
        className="
          fixed
          bottom-6
          right-6
          w-16
          h-16
          rounded-full
          bg-blue-600
          flex
          items-center
          justify-center
          text-white
          text-2xl
          shadow-2xl
          cursor-pointer
          z-[999999]
        "
      >
        💬
      </div>


      {/* OVERLAY CHAT WINDOW */}
      {open && (
        <div className="
          fixed
          inset-0
          flex
          items-end
          justify-end
          bg-black/30
          backdrop-blur-sm
          z-[999999]
        ">

          <div className="
            w-96
            h-[520px]
            bg-gray-900
            rounded-xl
            border
            border-gray-700
            flex
            flex-col
            m-6
          ">

            <div className="bg-blue-700 text-white p-3 font-bold flex justify-between">
              Student Assistant 🎓🗳️
              <button onClick={()=>setOpen(false)}>✖</button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">

              {messages.map((m,i)=>(
                <div
                  key={i}
                  className={`p-2 rounded text-sm whitespace-pre-line
                    ${m.from==="bot"
                      ? "bg-gray-800 text-white"
                      : "bg-blue-600 text-white ml-auto text-right"
                    }`}
                >
                  {m.text}
                </div>
              ))}

              <div ref={endRef}/>
            </div>

            <div className="flex border-t border-gray-700">
              <input
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e)=>e.key==="Enter" && send()}
                className="flex-1 bg-black text-white p-2 outline-none"
                placeholder="College or Election question..."
              />

              <button
                onClick={send}
                className="bg-blue-700 px-4 text-white"
              >
                Send
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}