import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/firebase"; // Import auth instead of database
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom

function ForgotPassword() {
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailVal = e.target.email.value;
        sendPasswordResetEmail(auth, emailVal) // Use auth instead of database
            .then((data) => {
                alert("Check your email");
                history("/");
            })
            .catch((err) => {
                alert(err.code);
            });
    };

    return (
        <div
            className="App"
            style={{
                background: "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))", // Set background image
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >

            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "20px", borderRadius: "8px", textAlign: "center", color: "black" }}>
                <h1><strong>Forgot Password</strong></h1>
                <p>Please enter your email address below. If an account exists with the email address provided, a password reset link will be sent to your email.</p>
                <br />
                <br />
                <p><strong>Password requirements:</strong></p>
                <ul style={{ textAlign: "left", marginLeft: "20px" }}>
                    <li>At least one number</li>
                    <li>At least one capital letter</li>
                    <li>At least one lowercase letter</li>
                    <li>Must be between 8 and 16 characters long</li>
                </ul>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input name="email" style={{ marginBottom: "10px", padding: "8px", width: "70%", color: "black", backgroundColor: "white", border: "1px solid black" }} />
                    <br />
                    <button style={{ padding: "8px 20px", backgroundColor: "blue", color: "white", borderRadius: "5px", border: "none" }}>
                        Reset
                    </button>
                </form>
                <p style={{ marginTop: "10px" }}>
                    Remember your password? <Link to="/login" style={{ color: "blue" }}>Back to Login</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;