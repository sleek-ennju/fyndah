import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import { AuthContext } from "../../context/AuthContext";
// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';


// icons
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SearchBusinessProfile, Loading } from "../../uiComponents";

//image
import { businesslogo } from "../../../assets/images";
import Swal from "sweetalert2";

function HeroSection() {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // form data
  const [businessName, setBusinessName] = useState(sessionStorage.getItem("lastServiceName") || "");
  const [businessLocation, setBusinessLocation] = useState(sessionStorage.getItem("lastServiceLocation") || "");
  const [businessCategory, setBusinessCategory] = useState("");
  const [recommendValue, SetRecommendValue] = useState(true);

  //location suggestion helper states
  const [suggestions, setSuggestions] = useState([]);
  const [previouslySuggestedValue, setPreviouslySuggestedValue] = useState("");


  const [businessCategories, setBusinessCategories] = useState([]);
  const [searchQueryIsLoading, setSearchQueryIsLoading] = useState(false);
  const autocompleteApiKey = "17af202f70b44748976eff28573589db";

  // pagination
  const [revealSearchQuery, setRevealSearchQuery] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const containsBusinesses = businesses.length > 0;
  const totalPages = Math.ceil(businesses.length / 3);
  const businessesForCurrentPage = businesses?.slice((currentPage - 1) * 3, currentPage * 3);


  // webhook 
  // const [webhookData, setWebhookData] = useState(null);

  //webhook handler
  // useEffect(() => {
    
  //   const echo = new Echo({
  //     broadcaster: 'pusher',
  //     key: '41fdd8aea06bdfcaf6e6', // Pusher App Key
  //     cluster: 'us2', // Pusher Cluster
  //     forceTLS: true,
  //   });

  //   // Listen 4 WebhookEvent on d webhook channel
  //   echo.channel('webhook').listen('.WebhookEvent', (data) => {
  //     console.log('Webhook event received:', data);
  //     setWebhookData(data);
  //   });

  //   return () => {
  //     echo.leaveChannel('webhook');
  //   };
  // }, []);

  

  // autocomplete useEffect
  useEffect(() => {
    const fetchData = async () => {
      if (businessLocation !== "" && previouslySuggestedValue !== businessLocation) {

        try {
          const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${businessLocation}&apiKey=${autocompleteApiKey}`);
          setSuggestions(response.data.features);
        } catch (err) {
          console.log(err.message || 'An error occurred');
        } finally {
          // setLoading(false);
        }
      }
    };

    const timerId = setTimeout(fetchData, 300); // Adjust debounce time as needed
    return () => clearTimeout(timerId); // Cleanup timeout on unmount
  }, [businessLocation, previouslySuggestedValue])

  // set current page for search results
  useEffect(() => {
    if (businessesForCurrentPage.length === 0 && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }, [businesses, currentPage, businessesForCurrentPage]);
  

  //get business categories
  useEffect(() => {
    axios
      .get("https://test-api.fyndah.com/api/v1/organization/categories", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        setBusinessCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleSuggestionClick = (selectedSuggestion) => {
    setBusinessLocation(selectedSuggestion.properties.formatted);
    setPreviouslySuggestedValue(selectedSuggestion.properties.formatted);
    setSuggestions([]);
  }

  const handleSeeMore = () => {
    setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : totalPages);
  }

  const handleSearchRequest = async () => {

    if (!authToken) {
      
      Swal.fire({
          icon: "warning",
          title: "Login required",
          text: "You will be redirected to the login page.",
          timer: 3000,
          timerProgressBar: true,
        });
        setTimeout(()=>{
          sessionStorage.setItem("lastRoute", location.pathname); //set last route in other to be redirected back to current page

          //set search query in other to have it restored when returned back to this page after successful login in.
          sessionStorage.setItem("lastServiceName", businessName ); 
          sessionStorage.setItem("lastServiceLocation", businessLocation );
          navigate('/login');
        }, 3001);
      
    } else {
      
      const url = "https://test-api.fyndah.com/api/v1/search/business"
      const data = {
        "searchTerms": [businessName, businessLocation, +businessCategory]
      };
      setSearchQueryIsLoading(true);
      containsBusinesses && setBusinesses([]);//empty business array to hide previous rendered search results
      setSuggestions([]);

      try {
        const response = await axios.post(url, data, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`,
          }
        });

        setSearchQueryIsLoading(false);
        if (response.status === 200)
          setBusinesses(response.data.data.results);
        console.log(response);
          setRevealSearchQuery(true);
          if(sessionStorage.getItem("lastServiceName") !== null){
              sessionStorage.removeItem("lastServiceName");
              sessionStorage.removeItem("lastServiceLocation");
          }
      } catch (error) {
        setSearchQueryIsLoading(false);
        if(sessionStorage.getItem("lastServiceName") !== null){
          sessionStorage.removeItem("lastServiceName");
          sessionStorage.removeItem("lastServiceLocation");
        }
        Swal.fire({
          icon: "error",
          title: "Search Request Failed",
          text: "An error occurred while trying to complete your search. Please try again later.",
          timer: 5000,
          timerProgressBar: true,
          footer: `${error?.response?.data?.message || error?.message}`
        });
      }
    }
  };
  



  //hide search query div after 30 seconds of non interactivity
  useEffect(() => {
    if (revealSearchQuery && containsBusinesses == false) {
      setTimeout(() => {
        setRevealSearchQuery(false);
      }, 90000)
    }
  }, [revealSearchQuery, containsBusinesses])
  

  return (
    <section className="bg-secondary w-full h-full flex flex-col justify-center py-8 px-4 sm:px-5 md:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-4xl text-textDark font-poppins font-bold tracking-wide text-center uppercase">Discover local businesses</h1>
        <p className="text-sm md:text-lg text-textDark font-roboto font-light text-center">Search, Buy, Sell.</p>
      </div>
      <div id="formbg" className="searchBox flex flex-col items-center md:flex-row md:items-start w-full md:max-w-[80%] lg:max-w-[85%] md:mx-auto gap-4 rounded-sm md:rounded-md px-4 md:px-8 py-6 md:py-24 mt-4">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex flex-col items-center md:flex-row gap-4 w-full">
            <div className="flex items-center gap-2 bg-primary bg-opacity-90 backdrop-blur-sm border-b-4  transition-all duration-300 border-accent focus-within:border-accentDark p-2 md:p-4 w-full rounded-sm">
              <FaBuilding className="w-4 h-4 text-textDark text-opacity-70" />
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                type="text"
                className="bg-transparent outline-none w-full font-roboto font-light text-textDark placeholder:font-poppins placeholder:text-base placeholder:font-light"
                placeholder="Product/services"
                name="business_name"
                required
              />
            </div>
            <div className="relative flex items-center gap-2 bg-primary bg-opacity-90 backdrop-blur-sm border-b-4 transition-all duration-300 border-accent focus-within:border-accentDark p-2 md:p-4 w-full rounded-sm">
              <FaLocationDot className="w-4 h-4 text-textDark text-opacity-70" />
              <input
                value={businessLocation}
                onChange={(e) => setBusinessLocation(e.target.value)}
                type="text"
                className="bg-transparent outline-none w-full font-roboto font-light text-textDark placeholder:font-poppins placeholder:text-base placeholder:font-light"
                placeholder="Country, state/city"
                name="location"
                required

              />
              <ul className="absolute left-0 bottom-0 flex flex-col gap-1 w-full border transform translate-y-[105%] bg-inherit">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="p-2 w-full hover:bg-accent hover:bg-opacity-70 cursor-pointer">
                    {suggestion.properties.formatted}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex  justify-center items-center flex-wrap md:flex-nowrap md:items-start gap-2 w-full">
            <select value={businessCategory} onChange={(e) => setBusinessCategory(e.target.value)} name="category" className="cursor-pointer w-full md:max-w-[49%] outline-none font-poppins font-light text-base p-1 md:p-2 rounded-md bg-primary bg-opacity-90">
              <option value="" defaultValue="null">Category</option>
              {businessCategories.map((category) => (
                <option key={category.id} value={category.id} className="font-poppins font-light text-sm">{category.name}</option>
              ))}
            </select>
            <div className="flex items-center gap-1 md:flex-1 md:justify-end">
              <input type="checkbox" checked={recommendValue} onChange={(e) => SetRecommendValue(e.target.checked)} id="recommended" className="cursor-pointer w-4 h-4 md:w-5 md:h-5" />
              <label htmlFor="recommended" className="font-poppins text-base cursor-pointer text-primary">Recommend?</label>
            </div>
          </div>
        </div>
        <div onClick={handleSearchRequest} className="bg-accent hover:bg-accentDark transition-all duration-300 p-2 md:p-4 rounded-lg cursor-pointer">
          <button type="submit" className="text-primary font-poppins font-light text-base md:text-lg ">Search</button>
        </div>
      </div>
      <div className="w-fit mx-auto my-4">
        {searchQueryIsLoading && <Loading />}
      </div>
      <div className={classNames(revealSearchQuery ? "h-full" : "h-0 overflow-hidden", "flex flex-col items-center gap-6 mt-4")}>
        {!containsBusinesses && searchQueryIsLoading == false ? (
          <div className="bg-navyBlue bg-opacity-90 rounded-lg p-4">
            <p className="text-primary font-poppins text-sm md:text-base font-light text-center"><span className="text-accentDark">No businesses found.</span> Try tweaking your search terms and give it another go!</p>
          </div>
        ) : businessesForCurrentPage.map((profile) => (
          <SearchBusinessProfile
            key={profile.id}
            org_id={profile.id}
            msg_id={profile.msg_id}
            businessProfileImg={businesslogo}
            businessName={profile.org_name}
            businessTitle={profile.org_bio}
            businessLocation={profile.locations[0].city}
          />
        ))}
        {totalPages > 3 && (
          <div className="flex items-center justify-between gap-4 w-full max-w-[300px] md:max-w-[80%] lg:max-w-[70%]">
            <button className='group disabled:cursor-not-allowed disabled:text-gray-400' onClick={() => setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1))} disabled={currentPage === 1}>
              See less
            </button>
            <p className='text-bGrey text-base font-normal'>
              {currentPage} of {totalPages} pages
            </p>
            <button className='group disabled:cursor-not-allowed disabled:text-gray-400' onClick={handleSeeMore} disabled={currentPage === totalPages}>
              See more
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroSection;