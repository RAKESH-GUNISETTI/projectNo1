# ByteBolt TechMate

A modern learning platform for tech enthusiasts to enhance their skills through interactive challenges and real-time coding tasks.

## Features

- **Interactive Challenges**: Take on coding challenges, quizzes, and assignments
- **Real-time Progress Tracking**: Monitor your learning journey
- **Reward System**: Earn credits and XP for completing challenges
- **Profile Management**: Customize your profile and track achievements
- **Activity History**: View your learning history and achievements

## Tech Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **State Management**: React Context

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bytebolt-techmate.git
   ```

2. Install dependencies:
   ```bash
   cd bytebolt-techmate
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
bytebolt-techmate/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utility functions
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── index.html         # Entry HTML file
```

## Features in Detail

### Challenges
- Multiple types of challenges (Coding, Quiz, Assignment)
- Real-time progress tracking
- Performance-based rewards
- Time-limited challenges

### Profile
- Customizable user profiles
- Achievement tracking
- Activity history
- Credit system

### Learning Experience
- Interactive coding environment
- Immediate feedback
- Progress tracking
- Performance analytics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Lucide Icons](https://lucide.dev/)
