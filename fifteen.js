/* General Styles */
body {
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Align items from the top */
    height: 100vh; /* Full viewport height */
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

/* Header Styles */
#main-header {
    text-align: center;
    background: linear-gradient(to right, #4caf50, #1e88e5);
    color: white;
    padding: 20px;
    border-bottom: 5px solid #333;
    animation: fadeIn 2s ease-in;
    width: 100%; /* Ensure header spans the full width */
    position: relative; /* Fix any potential overlapping */
}

/* Sub-header text styling */
.sub-header {
    font-size: 1.2em;
    font-weight: 300;
    margin-top: 5px;
}

/* Puzzle Container */
#puzzle-container {
    text-align: center;
    margin-top: 20px;
}


/* Validators */
#validators {
    text-align: right;
    margin-top: 20px;
}

#validators img {
    border: none;
}

/* Keyframe Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes popup {
    0% {
        transform: scale(0);
    }
    80% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

