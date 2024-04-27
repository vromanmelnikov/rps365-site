import React from "react"

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)

        // Define a state variable to track whether is an error or not
        this.state = { hasError: false, error: '' }
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI

        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo })
        this.setState({...this.state, error: {
            error: error.message,
            info: errorInfo.componentStack
            
        }})
    }
    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        {
                            this.state.error.error
                        }
                        <br />
                        {
                            this.state.error.info
                        }
                    </button>
                </div>
            )
        }

        // Return children components in case of no error

        return this.props.children
    }
}

export default ErrorBoundary