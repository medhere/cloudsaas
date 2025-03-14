import { useEffect, Suspense, useState } from "react";
import { useLocation } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import axios from "axios";
// import useSignOut from "react-auth-kit/hooks/useSignOut";

export default function Loadables({ children }) {
  return (
    <>
      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => {
          return (
            <div className="text-center mx-auto mt-[20vh]">
              <p>Something went wrong:</p>
              <pre>{error.message}</pre>
              <button className="w-20 btn" onClick={resetErrorBoundary}>
                Try again
              </button>
            </div>
          );
        }}
        onReset={() => {
          console.log("app reset");
        }}
      >
        <Suspense fallback={<>ProgressBar</>}>
          <AxiousLoadingUI />
          <ScrollToTop />
          {children}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}


function AxiousLoadingUI({ children }) {
  const [axiosState, setAxiosState] = useState(false)
  const [loadingtext, setLoadingtext] = useState('Please Wait...')
//   const signOut = useSignOut()

  axios.interceptors.request.use(
    (req) => {
      setAxiosState(true)
      setLoadingtext('Please Wait...')
      return req;
    },
    (err) => {
      setAxiosState(false)
      setLoadingtext('Please Wait...')
      return Promise.reject(err)
    }
  );

  axios.interceptors.response.use(
    (res) => {
      setAxiosState(false)
      setLoadingtext('Please Wait...')      
      return res;
    },
    (err) => {
      setAxiosState(false)
      setLoadingtext('Server Error! Reload Page')
      if(err.response.status === 401) {
        //signOut()
        }
      
      return Promise.reject(err)
    }
  );

  return (
    <>Loading...</>
    // <IonLoading
    //   spinner='lines-sharp'
    //   // translucent={true}
    //   isOpen={axiosState}
    //   // onDidDismiss={() => setAxiosState(false)}
    //   message={loadingtext}
    // // duration={10000}
    // />
  )
}
