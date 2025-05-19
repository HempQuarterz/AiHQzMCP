import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to Hemp Hub
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Your comprehensive resource for all things industrial hemp
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          {
            title: 'Explore Archetypes',
            description: 'Discover different hemp plant archetypes and their uses',
            link: '/archetypes',
            bgColor: 'bg-green-50',
            textColor: 'text-green-700'
          },
          {
            title: 'Browse Products',
            description: 'Find hemp-based products and applications',
            link: '/products',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700'
          },
          {
            title: 'Learn More',
            description: 'Understand the benefits and science behind hemp',
            link: '/about',
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-700'
          }
        ].map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className={`${card.bgColor} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
          >
            <h2 className={`text-xl font-semibold mb-2 ${card.textColor}`}>
              {card.title}
            </h2>
            <p className="text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
