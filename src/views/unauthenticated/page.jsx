import React from "react";

function Unauthenticated() {
  return (
    <>
        <div
        className="relative top-420 left-0 w-[100vw] h-full border flex items-center justify-center min-h-screen bg-white bg-no-repeat bg-cover bg-bottom error-bg"
        style={{backgroundImage: "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='#e2252e' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23e6d710' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23e7af05' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%23e7d808' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d8a408' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23f1e213' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23f0b607' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%23e4d506' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23eab822' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23e8da14' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23e8b008' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23edde14' points='943 900 1210 900 971 687'/%3E%3C/svg%3E);"}}
        >
        <div className="h-[30vh] container">
            <div className="row">
            <div className="col-sm-8 offset-sm-2 text-[#fff0f0] text-center -mt-52">
                <div className="relative ">
                <h1 className="relative text-[#e2252e] text-9xl tracking-tighter-less text-shadow font-sans font-bold">
                    <span>4</span>
                    <span>0</span>
                    <span>1</span>
                </h1>
                <span className="absolute  top-0   -ml-12  text-[#e2252e] font-semibold">
                    Oops!
                </span>
                </div>
                <h5 className="text-[#e2252e] font-semibold -mr-10 -mt-3">
                Unauthenticated
                </h5>
                <p className="text-[#e2252e] mt-2 mb-6">
                Please Re-Authenticate
                </p>
                <a className="bg-gray-400 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
                Got to Home
                </a>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}

export default Unauthenticated;
