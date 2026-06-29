"use client"

import { useState } from "react";
import { BsSearch, BsBook, BsCalendar3, BsClock } from "react-icons/bs";

const BLOG_POSTS = [
    {
        id: 1,
        title: "The Power of Play: How Educational Toys Shape Young Minds",
        category: "Development",
        image: "https://images.unsplash.com/photo-1515488042361-404e9250afef?q=80&w=600",
        date: "June 28, 2026",
        readTime: "5 min read",
        summary: "Discover how cognitive development, spatial reasoning, and fine motor skills are enhanced by playing with structured wooden boards and puzzles.",
        content: "Play is often talked about as if it were a relief from serious learning. But for children, play is serious learning. Structured educational toys act as building blocks for cognitive thinking. When a toddler interacts with a wooden puzzle, they aren't just fitting shapes; they are conducting early geometry, testing gravity, and developing hand-eye coordination.\n\nResearch shows that tactile, screen-free toys significantly boost focus and problem-solving abilities in early childhood compared to passive digital consumption. Parents can encourage this growth by introducing age-appropriate sensory toys that challenge kids while maintaining a sense of wonder and fun. At Little Wonders, we believe every play session is an opportunity for a breakthrough."
    },
    {
        id: 2,
        title: "Screen-Free Parenting: Effective Ways to Reclaim Playtime",
        category: "Parenting Tips",
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=600",
        date: "June 25, 2026",
        readTime: "4 min read",
        summary: "Struggling to reduce screen time? Here are practical strategies to redirect your child's energy to hands-on sensory exploration.",
        content: "In today's digital era, screen-free time is one of the greatest gifts we can offer our children. Too much screen time has been linked to shorter attention spans and sleep disturbances. Reclaiming playtime doesn't have to be a battle.\n\nStart by creating screen-free zones in your home, especially in bedrooms and during meals. Replace the digital allure with engaging physical alternatives like sensory boards, coloring books, and action costumes. When children have access to toys that respond directly to their physical actions, they become active creators rather than passive observers. Engagement rises, curiosity thrives, and screens are naturally left behind."
    },
    {
        id: 3,
        title: "Unlocking Creativity Through Role-Play and Costumes",
        category: "Play Guides",
        image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600",
        date: "June 20, 2026",
        readTime: "6 min read",
        summary: "From superhero outfits to occupational costumes, learn how role-playing fosters empathy, confidence, and social-emotional growth.",
        content: "When a child puts on a superhero cape or a doctor's lab coat, a magical transformation occurs. Role-play is a crucial component of child development. It allows children to step into someone else's shoes, fostering empathy and emotional intelligence.\n\nIn addition, role-play builds self-confidence and language skills as children narrate their scenarios and collaborate with peers. By providing dress-up costumes and props, parents create a low-stakes environment for children to experiment with social rules, conquer fears, and explore their imaginations. Give your child the space to act, pretend, and create their own mini-adventures."
    },
    {
        id: 4,
        title: "How to Choose the Perfect Toy for Every Age Group",
        category: "Play Guides",
        image: "https://images.unsplash.com/photo-1537655780520-1e392edd816a?q=80&w=600",
        date: "June 15, 2026",
        readTime: "7 min read",
        summary: "Avoid toy overwhelm by using this age-by-age developmental guide to choose toys that grow with your child's abilities.",
        content: "Walk into any toy store and you will be met with an overwhelming array of options. How do you know what will actually engage your child rather than collect dust? The secret lies in understanding developmental stages.\n\nFor infants (0-12 months), focus on sensory exploration: high-contrast colors, soft textures, and gentle sounds. Toddlers (1-3 years) need toys that support motor development and cause-and-effect: stackers, push toys, and sorting boards. Preschoolers (3-5 years) thrive on cooperative and imaginative play: construction sets, role-play props, and early educational games. Choosing toys aligned with these milestones keeps playtime stimulating, rewarding, and safe."
    }
];

const CATEGORIES = ["All", "Development", "Parenting Tips", "Play Guides"];

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [activeModalPost, setActiveModalPost] = useState(null);

    const filteredPosts = BLOG_POSTS.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              post.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="py-10 px-4 max-w-6xl mx-auto min-h-screen">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
                    Our <span className="text-primary">Parenting & Play Blog</span>
                </h1>
                <p className="text-base-content/60 max-w-2xl mx-auto text-base md:text-lg">
                    Discover tips, guides, and developmental research to help your little wonders thrive through screen-free play.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 bg-base-200/50 p-4 rounded-3xl border border-base-300/40">
                <div className="relative w-full md:w-80">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
                        <BsSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input input-bordered w-full pl-10 rounded-2xl bg-base-100"
                    />
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`btn btn-sm rounded-full px-5 ${
                                selectedCategory === category 
                                    ? "btn-primary text-white" 
                                    : "btn-outline border-base-300 hover:bg-base-200 text-base-content/85"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map(post => (
                        <article 
                            key={post.id} 
                            className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full rounded-3xl"
                        >
                            <div className="relative h-64 w-full bg-base-200 shrink-0">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                <span className="absolute top-4 left-4 badge badge-primary font-semibold py-3 px-4 rounded-full text-white shadow-sm">
                                    {post.category}
                                </span>
                            </div>

                            <div className="card-body p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-base-content/50 mb-3">
                                    <span className="flex items-center gap-1">
                                        <BsCalendar3 /> {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BsClock /> {post.readTime}
                                    </span>
                                </div>

                                <h2 className="card-title text-xl md:text-2xl font-bold leading-tight text-base-content hover:text-primary transition-colors cursor-pointer mb-3"
                                    onClick={() => setActiveModalPost(post)}
                                >
                                    {post.title}
                                </h2>

                                <p className="text-base-content/70 text-sm md:text-base mb-5 line-clamp-3">
                                    {post.summary}
                                </p>

                                <div className="card-actions mt-auto">
                                    <button 
                                        onClick={() => setActiveModalPost(post)}
                                        className="btn btn-primary btn-outline btn-sm rounded-full gap-2 hover:text-white"
                                    >
                                        <BsBook /> Read Article
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-base-200/30 rounded-3xl border border-dashed border-base-300">
                    <p className="text-xl text-base-content/50">No articles found matching your criteria.</p>
                    <button 
                        onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                        className="btn btn-primary btn-sm rounded-full mt-4"
                    >
                        Reset Filters
                    </button>
                </div>
            )}

            {activeModalPost && (
                <div className="modal modal-open bg-black/60 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center p-4">
                    <div className="modal-box max-w-3xl rounded-3xl border border-base-200 shadow-2xl overflow-y-auto max-h-[90vh] bg-base-100 p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setActiveModalPost(null)}
                            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-lg"
                        >
                            ✕
                        </button>

                        <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden mb-6 bg-base-200">
                            <img
                                src={activeModalPost.image}
                                alt={activeModalPost.title}
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute top-4 left-4 badge badge-primary font-semibold py-3 px-4 rounded-full text-white shadow-sm">
                                {activeModalPost.category}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs md:text-sm text-base-content/50 mb-4">
                            <span className="flex items-center gap-1">
                                <BsCalendar3 /> {activeModalPost.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <BsClock /> {activeModalPost.readTime}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-extrabold text-base-content leading-tight mb-6">
                            {activeModalPost.title}
                        </h2>

                        <div className="text-base-content/85 leading-relaxed space-y-4 text-sm md:text-base border-t border-base-200 pt-6">
                            {activeModalPost.content.split('\n\n').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="modal-action border-t border-base-200 pt-4 mt-8">
                            <button 
                                onClick={() => setActiveModalPost(null)}
                                className="btn btn-primary rounded-full px-6"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
