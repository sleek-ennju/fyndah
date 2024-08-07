import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LandingPage, SignUp, Login, BusinessProfileSetup, AdProfileSetup, UserProfileSetup,
  AdminLayout, Profile, FavoriteBusiness, Messages, CreateBusiness,
  MyBusiness,ResetPassword,UpdatePassword,
  // ArchivedMessage,
} from "../components/pages";
import {
  BusinessDashboardLayout, BusinessLogOut, BusinessMessages, BusinessProfile, Posts, Timeline,
  Wallet, BusinessArchiveMessage, 
} from '../components/businessDashboard/index';
import Policies, { Tos, Privacy, Refund } from "../components/policy";
import { PageNotFound } from "../components/errorPages";
import Leads from "../components/businessDashboard/leadsGeneration/Leads";
import CurrentSearchRequest from "../components/businessDashboard/leadsGeneration/CurrentSearchRequest";
import HistorySearchRequest from "../components/businessDashboard/leadsGeneration/HistorySearchRequest";
import BidPage from "../components/businessDashboard/leadsGeneration/BidPage";
import PotentialCustomerData from "../components/businessDashboard/leadsGeneration/PotentialCustomerData";
import OnSuccessful from "../components/wallet/welletComponent/OnSuccessful";
import Onfailed from "../components/wallet/welletComponent/Onfailed";
import PrivateRoutes from "./PrivateRoutes";
import ArchivedMessage from "../components/userDashboard/ArchivedMessage";
// import CountryStateCitySelector from "../components/test/test";
function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <PageNotFound />
    },
    {
      path: "/signup",
      element: <SignUp />,
      errorElement: <PageNotFound />
    },
    {
      path: "/ResetPassword",
      element: <ResetPassword />,
      errorElement: <PageNotFound />
    },
    // {
    //   path: "updatepassword",
    //   element: <UpdatePassword />,
    //   errorElement: <PageNotFound />
    // },
    {
      path: "/login",
      element: <Login />,
      errorElement: <PageNotFound />
    },
    // {
    //   path: "/testing",
    //   element: <CountryStateCitySelector />,
    //   errorElement: <PageNotFound />
    // },
    {
      path: "/dashboard",
      element: <PrivateRoutes />, // Protect all dashboard routes
      errorElement: <PageNotFound />,
      children: [
        {
          path: "",
          element: <AdminLayout />,
          children: [
            {
              path: 'profile',
              element: <Profile />,
              errorElement: <PageNotFound />
            },
            {
              path: 'updatepassword',
              element: <UpdatePassword />,
              errorElement: <PageNotFound />
            },
            {
              path: "user-profile-setup",
              element: <UserProfileSetup />,
              errorElement: <PageNotFound />
            },
            {
              path: "business-profile-setup",
              element: <BusinessProfileSetup />,
              errorElement: <PageNotFound />
            },
            {
              path: "ad-profile-setup",
              element: <AdProfileSetup />,
              errorElement: <PageNotFound />
            },
            {
              path: 'favoritebusiness',
              element: <FavoriteBusiness />,
              errorElement: <PageNotFound />
            },
            {
              path: 'messages',
              element: <Messages />,
              errorElement: <PageNotFound />
            },
            {
              path: 'messages/archived-messages',
              element: <ArchivedMessage />,
              errorElement: <PageNotFound />
            },
            {
              path: 'createbuisness',
              element: <CreateBusiness />,
              errorElement: <PageNotFound />
            },
            {
              path: 'mybusiness',
              element: <MyBusiness />,
              errorElement: <PageNotFound />
            }
          ]
        }
      ]
    },

    //business dashboard layout
    {
      path: "/businessDashboard/:id/:name",
      element: <PrivateRoutes />, // Protect all businessDashboard routes
      errorElement: <PageNotFound />,
      children: [
        {
          path: "",
          element: <BusinessDashboardLayout />,
          children: [
            {
              path: 'posts',
              element: <Posts />,
              errorElement: <PageNotFound />
            },
            {
              path: 'leads',
              element: <Leads />,
              errorElement: <PageNotFound />
            },
            {
              path: 'search-request-history',
              element: <HistorySearchRequest />,
              errorElement: <PageNotFound />
            },
            {
              path: 'potential-customer-data',
              element: <PotentialCustomerData />,
              errorElement: <PageNotFound />
            },
            {
              path: 'search-request',
              element: <CurrentSearchRequest />,
              errorElement: <PageNotFound />
            },
            {
              path: 'bid-page',
              element: <BidPage />,
              errorElement: <PageNotFound />
            },
            {
              path: 'businessmessages',
              element: <BusinessMessages />,
              errorElement: <PageNotFound />
            },
            {
              path: 'businessmessages/business-archived-messages',
              element: <BusinessArchiveMessage />,
              errorElement: <PageNotFound />
            },
            {
              path: 'businesslogout',
              element: <BusinessLogOut />,
              errorElement: <PageNotFound />
            },
            {
              path: 'business-profile',
              element: <BusinessProfile />,
              errorElement: <PageNotFound />
            },
            {
              path: 'timeline',
              element: <Timeline />,
              errorElement: <PageNotFound />
            },
            {
              path: 'wallet',
              element: <Wallet />,
              errorElement: <PageNotFound />
            },
            {
              path: 'onsuccess',
              element: <OnSuccessful />,
              errorElement: <PageNotFound />
            },
            {
              path: 'onfailed',
              element: <Onfailed />,
              errorElement: <PageNotFound />
            }
          ]
        }
      ]
    },

    //fyndahs policy
    {
      path: "/policies",
      element: <Policies />,
      children: [
        {
          path: "/policies/tos",
          element: <Tos />,
          errorElement: <PageNotFound />
        },
        {
          path: "/policies/privacy",
          element: <Privacy />,
          errorElement: <PageNotFound />
        },
        {
          path: "/policies/refund",
          element: <Refund />,
          errorElement: <PageNotFound />
        },
        {
          path: "/policies/*",
          element: <Tos />,
          errorElement: <PageNotFound />
        },
      ],
      errorElement: <PageNotFound />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default Routes;