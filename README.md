# 🌍 Flag Memory Game

A fun, two-player memory game built using **HTML, CSS, and JavaScript**. Players take turns revealing cards to find matching country flags. Test your memory, score points, and compete to find the most pairs!

## ✨ Features

- 🌎 **Country Flags:** Fetches country names and flag images from an API.
- 🃏 **16 Interactive Cards:** Eight unique countries, each appearing twice.
- 🔀 **Randomized Cards:** Cards are shuffled at the start of each game.
- 👥 **Two-Player Mode:** Play with a friend on the same device.
- 🏆 **Score Tracking:** Earn one point for every matching pair.
- 🔄 **Turn Management:** Find a match to keep your turn; miss a match and the turn passes to the other player.
- 🎯 **Win Detection:** Announces the winner or a draw when all pairs are found.
- ♻️ **Restart Option:** Reset the game and play again.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Fetch API and async/await
- [countries.dev](https://countries.dev/docs) API for country and flag data
- Font Awesome for icons

## 🎮 How to Play

1. Start the game and view the 16 face-down cards.
2. Player 1 clicks two cards to reveal their flags.
3. If the flags match, the player earns one point and gets another turn.
4. If the flags don't match, they are hidden again after a short delay, and the turn passes to the other player.
5. Continue until all eight pairs are found.
6. The player with the highest score wins!

## 🚀 Getting Started

1. Clone this repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Open the project folder.
3. Open `index.html` in your browser, or use the Live Server extension in VS Code.
4. Start playing!

An internet connection is required to fetch country data and flag images from the API.

## 📁 Project Structure

```text
flag-memory-game/
├── index.html
├── style.css
└── app.js
```

## 🎯 Learning Outcomes

This project helped me practice:

- Working with APIs using `fetch()` and `async/await`
- Handling arrays and objects
- Dynamically creating and updating DOM elements
- Adding event listeners
- Implementing array shuffling
- Managing game state, turns, and scores
- Handling asynchronous operations and errors

## 🔮 Future Improvements

- Add difficulty levels.
- Add a timer and move counter.
- Add sound effects and animations.
- Improve the mobile experience.
- Add more countries and flag collections.

---

**Built with ❤️ using HTML, CSS, and JavaScript.**
