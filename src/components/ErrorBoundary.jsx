import React from "react";

class ErrorBoundary extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      hasError: false,

    };

  }

  static getDerivedStateFromError() {

    return {

      hasError: true,

    };

  }

  componentDidCatch(error, info) {

    console.error(error);

    console.error(info);

  }

  render() {

    if (this.state.hasError) {

      return (

        <div className="min-h-screen flex items-center justify-center">

          <div className="text-center">

            <h1 className="text-4xl font-bold text-red-600">

              Oops!

            </h1>

            <p className="mt-4 text-gray-600">

              Something went wrong.

            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Refresh Page
            </button>

          </div>

        </div>

      );

    }

    return this.props.children;

  }

}

export default ErrorBoundary;