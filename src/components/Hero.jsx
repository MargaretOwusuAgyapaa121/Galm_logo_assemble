// export default function Hero() {
//   return (
//     <section className="hero">
//       <div className="hero-overlay"></div>
      

//       <div className="hero-content">
//         <img src="/assets/img/icon4.png" alt="Church Logo" className="hero-logo" />
//         <h1 className="main-title">Glorious Anchor of Life</h1>
//         <h2 className="hero-subtitle">  Logos Assembly</h2>
//         <p>
//           Anchored in Purpose. Elevated in Grace. 
//           <br />
//           Step Into Your Divine Calling.
//         </p>

//         <button
//           onClick={() =>
//             document.getElementById("form").scrollIntoView({ behavior: "smooth" })
//           }
//         >
//           Become a Member
//         </button>
//       </div>
//     </section>
//   );
// }
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <img src="/assets/img/icon4.png" alt="Church Logo" className="hero-logo" />
       <h1 className="main-title">
  Glorious Anchor of Life <span className="line2">- Logos Assembly</span>
</h1>

        <p>
          Anchored in Purpose. Elevated in Grace. 
          <br />
          Step Into Your Divine Calling.
        </p>

        <button
          onClick={() =>
            document.getElementById("form").scrollIntoView({ behavior: "smooth" })
          }
        >
          Become a Member
        </button>
      </div>
    </section>
  );
}