# Sentiment Analysis App

This is a simple sentiment analysis application that allows users to input text and receive feedback on whether the sentiment is positive, negative, or neutral. The app uses a pre-trained machine learning model to analyze the sentiment of the input text.

## Features

- User-friendly interface for text input
- Real-time sentiment analysis
- Displays sentiment results with confidence scores

## Installation

### I. Clone the repositories:

#### 1- Sentiment Analysis Backend

- link to backend repository: [backend_repository_url](https://github.com/codehass/sentiment-analysis-back-end)

- clone the backend repository:

```bash
git clone https://github.com/codehass/sentiment-analysis-back-end.git
```

```bash
cd sentiment-analysis-back-end
```

- create a virtual environment and install dependencies:

```bash
python3 -m venv venv  # On Windows use `python -m venv venv`
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

- create a `.env` file in the backend directory and add any necessary environment variables.

```
cp .env.example .env
```

- create a database in your local PostgreSQL server and update the `.env` file with your database credentials.

- run backend server:

```bash
fastapi dev app/main.py
```

    The backend server should now be running at `http://localhost:8000`.

#### 2- Sentiment Analysis Frontend

- Clone the frontend repository:

```bash
git clone git@github.com:codehass/sentiment-analysis-front-end.git
```

```bash
cd sentiment-analysis-front-end
```

- Install the dependencies:

```bash
npm install
```

- Configure the backend API URL:

  - Create a `.env` file in the frontend directory and add the backend API URL.

```shell
cp .env.example .env
```

- Start the development server:

```bash
npm run dev
```

    The frontend server should now be running at `http://localhost:3000` or given option.

## 3 Run using docker

1- Clone two repositories in the same directory example: `sentiment-analysis`

```shell
  mkdir sentiment-analysis
  cd sentiment-analysis
  git clone https://github.com/codehass/sentiment-analysis-back-end.git
  git clone git@github.com:codehass/sentiment-analysis-front-end.git
```

2- Redirect to frontend repository

```shell
cd sentiment-analysis-front-end
```

3- Create a `.env` file in the frontend directory and add the backend API URL.

```shell
cp .env.example .env
```

4- Run docker compose:

```shell
docker compose up build --no cache
```
