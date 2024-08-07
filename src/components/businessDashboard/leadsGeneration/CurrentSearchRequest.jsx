import { useContext, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import SearchRequestDescription from "./SearchRequestDescription";

import SearchRequestHistoryDropDown from "./SearchRequestHistoryDropDown";

import { AuthContext } from "../../context/AuthContext";

import EmptyLeads from "./EmptyLeads";
import LinkButton from "./LinkButton";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
];

function CurrentSearchRequest() {
  const [open, setOpen] = useState(false);
  const [dal, setDal] = useState("");
  const [show, setShow] = useState("");
  const [request, setRequest] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id, name } = useParams();
  const { authToken } = useContext(AuthContext);

  const SEARCH_URL = "https://test-api.fyndah.com/api/v1/search/requests/active";
  useEffect(
    function () {
      async function retrieveSearchRequest() {
        try {
          setIsLoading(true);
          const res = await fetch(`${SEARCH_URL}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          });
          const data = await res.json();
          console.log(data);
          setRequest(data);
          console.log(request);
          setIsLoading(false);
        } catch {
          console.log("Breadddddyyyy");
        }
      }
      retrieveSearchRequest();
    },
    [authToken]
  );

  //  Function to place a Bid
  const BASE_URL = `https://test-api.fyndah.com/api/v1/search/requests/${id}/bid`;
  async function bidRequest() {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({ bid_amount: 200 }),
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = res.json();
    console.log(data + "Has come back");

    if (
      data.status === "error" &&
      data.message === "You have already placed a bid on this search request."
    ) {
      setShow("You already placed a bid");
    } else if (data.error === "Insufficient funds in the wallet") {
      setShow(
        "You have insufficient Funds and Therefore cannot place this bid"
      );
    } else if (
      (data.status === "error",
      data.message === "This business has no access to this search request")
    ) {
      setShow("Your business does not have the right to place this bid");
    }
    setOpen(false);
    Swal.fire({
      icon: "success",
      title: "Well.. Error....",
      text: `${show}`,
      timer: 2000,
      timerProgressBar: true,
    });
  }

  // const po = `/businessDashboard/${id}/${name}/posts`;
  // if (!request?.length)
  //   return (
  //     <EmptyLeads
  //       data="There are Currently no Available Search Request Related to your Business. When they are, you would see them here."
  //       posts={po}
  //     />
  //   );

  // if (!request?.length) return <EmptyLeads posts={po} />;
  // return (

  //   <div className="flex flex-col items-center justify-center mt-5">
  //     <h1 className="mb-10 text-xl font-black">
  //       Current Available Search Request Related to your Business
  //     </h1>
  //     {/* Modal to show the Search request description */}
  //     {/* {open && (
  //       <SearchRequestDescription
  //         settOpen={setOpen}
  //         infoOfSearch="Send search datta to the modal"
  //         requestValue={request.id}
  //       />
  //     )} */}

  //     {isLoading ? (
  //       <SpinnerFullPage />
  //     ) : (
  //       <ul role="list" className="divide-y divide-gray-100">
  //         {/* {people.map((person) => ( */}
  //         {request?.map((request) => (
  //           // open && (
  //           //   <SearchRequestDescription
  //           //     settOpen={setOpen}
  //           //     infoOfSearch="Send search datta to the modal"
  //           //     requestValue={request.id}
  //           //   />
  //           // )

  //           <li key={request.id} className="flex justify-between gap-x-6 py-5">
  //             {open && (
  //               <SearchRequestDescription
  //                 settOpen={setOpen}
  //                 infoOfSearch="Send search datta to the modal"
  //                 requestData={request}
  //                 key={request.id}
  //               />
  //             )}
  //             <div className="flex min-w-0 gap-x-4">
  //               <img
  //                 key={request.id}
  //                 className=" blur h-12 w-12 flex-none rounded-full bg-gray-50"
  //                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  //                 alt="avaterrrr"
  //               />
  //               <div key={request.id} className="min-w-0 flex-auto">
  //                 <p className="blur text-sm font-semibold leading-6 text-gray-900">
  //                   {/* {person.name}  */}
  //                   Kusner Tstero
  //                 </p>
  //                 <p className="mt-1 truncate text-xs leading-5 text-gray-500">
  //                   {/* {person.email}  */}
  //                   <span className="blur"> exampleMail </span> @gmail.com
  //                 </p>
  //               </div>
  //             </div>
  //             <div
  //               key={request.id}
  //               className="hidden shrink-0 sm:flex sm:flex-col sm:items-end"
  //             >
  //               <p className="text-sm leading-6 text-gray-900">person.role</p>
  //               {/* {person.lastSeen ? ( */}
  //               <>
  //                 <p className="mt-1 text-xs leading-5 text-gray-500">
  //                   Time of search:{" "}
  //                   {/* <time dateTime={person.lastSeenDateTime}>
  //                       {person.lastSeen}
  //                     </time> */}
  //                 </p>
  //                 {/* <p className="mt-1 text-xs leading-5 text-gray-500">
  //                     Time left till search bid expire{" "}
  //                     <time dateTime={person.lastSeenDateTime}>
  //                       {person.lastSeen}
  //                     </time>
  //                   </p> */}
  //               </>
  //               {/* // ) : ( */}
  //               <div
  //                 key={request.id}
  //                 className="mt-1 flex items-center gap-x-1.5"
  //               >
  //                 <div className="flex-none rounded-full bg-emerald-500/20 p-1">
  //                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
  //                 </div>
  //                 <p className="text-xs leading-5 text-gray-500">Online</p>
  //               </div>
  //               {/* // )} */}
  //             </div>
  //             {/* <button onClick={openModal(true)} className="bg-indigo-500 rounded-md px-1 py-0">View Description</button> */}
  //             <button
  //               onClick={() => setOpen(true)}
  //               className="bg-indigo-500 rounded-full px-2 py-0"
  //               key={request.id}
  //             >
  //               View Description
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );

  return (
    <>
      {/* <p className="flex flex-col items-center justify-center mt-24 px-4 py-3 ">
    </p> */}
      <>
        <div className=" gap-x-10 flex items-center justify-between mt-16 px-4 py-3  text-2xl">
          {/* <Link to={`/businessDashboard/${id}/${name}/search-request-history`}> */}
          
        <div className="6 lg:pl-72">
            <Button colorScheme="blue" size="lg">Search Request </Button>
        </div>
          {/* </Link> */}
          <SearchRequestHistoryDropDown />
        </div>

        {isLoading ? (
          <div>
            <p className="flex flex-col items-center justify-center mt-24 px-4 py-3  text-2xl">
              We are checking to see if you have any Search Requests
            </p>
            <span className=" ml-10 flex items-center justify-center ">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </span>
          </div>
        ) : (
          <>
            {!isLoading && !request?.length ? (
              <div className="flex flex-col items-center justify-center mt-24 px-4 py-3 ">
                <LinkButton to={`/businessDashboard/${id}/${name}/posts`}>
                  &larr; Back to Posts
                </LinkButton>

                <p className="mt-4 font-semibold px-3">
                  <p>
                    <span className="flex items-center justify-center text-2xl font-black pr-2">
                      Nothing to show yet!
                    </span>
                  </p>
                  Keep an eye on this space, and we will display relevant Search
                  Requests related to your business as soon as they become
                  available
                </p>
              </div>
            ) : (
              <>
                {open && (
                  <SearchRequestDescription
                    settOpen={setOpen}
                    infoOfSearch="Send search datta to the modal"
                    requestData={request}
                    dal={dal}
                    bidRequest={bidRequest}
                    key={request.id}
                  />
                )}
                <h1 className="flex flex-col items-center justify-center mt-5 mb-10 text-4xl font-black">
                  Search Request Related to your Business
                </h1>
                <ul
                  role="list"
                  className="flex flex-col items-center justify-center mt-5 divide-y divide-gray-100"
                >
                  {request?.map((person) => (
                    <li
                      key={person.id}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {person.search_term}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {person.search_filters}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {person.role}
                        </p>
                        {/* {person.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Time of Search <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )} */}
                        <button
                          onClick={() => {
                            setOpen(true);
                            setDal({
                              term: person.search_term,
                              filter: person.search_filters,
                            });
                          }}
                          className="bg-indigo-500 rounded-full px-2 py-0"
                          key={person.id}
                        >
                          View Search Description in depth
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </>
    </>
  );

  // return (

  //   <ul role="list" className="flex flex-col items-center justify-center mt-5 divide-y divide-gray-100">
  //    <button onClick={ Swal.fire({
  //     icon: "success",
  //     title: "Well.. Error....",
  //     text: `${show}`,
  //     timer: 2000,
  //     timerProgressBar: true,
  //   })} className="bg-red-300">DRAGOOO</button>
  //     {people.map((person) => (
  //       <li key={person.email} className="flex justify-between gap-x-6 py-5">
  //         <div className="flex min-w-0 gap-x-4">
  //           <img className="blur h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
  //           <div className="min-w-0 flex-auto">
  //             <p className=" blur text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
  //             <p className="mt-1 truncate text-xs leading-5 text-gray-500"> <span className="blur">jjdfhvfueiief3344</span> gmail.com</p>
  //           </div>
  //         </div>
  //         <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
  //           <p className="text-sm leading-6 text-gray-900">Search Term</p>
  //           {person.lastSeen ? (
  //             <p className="mt-1 text-xs leading-5 text-gray-500">
  //               Time of search: <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
  //             </p>
  //           ) : (
  //             <div className="mt-1 flex items-center gap-x-1.5">
  //               <div className="flex-none rounded-full bg-emerald-500/20 p-1">
  //                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
  //               </div>
  //               <p className="text-xs leading-5 text-gray-500">Online</p>
  //             </div>
  //           )}
  //         </div>
  //       </li>
  //     ))}
  //   </ul>
  // )
}

export default CurrentSearchRequest;
