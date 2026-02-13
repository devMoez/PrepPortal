// Theme Management
const themeManager = {
    theme: localStorage.getItem('theme') || 'dark',
    init() {
        // Initialize theme immediately
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateIcon();

        // Use event delegation for the toggle to ensure it works even if re-rendered
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('#theme-toggle');
            if (btn) {
                this.toggle();
            }
        });
    },
    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateIcon();
    },
    updateIcon() {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            // Remove old icon and create new one for Lucide to Pick up
            icon.setAttribute('data-lucide', this.theme === 'dark' ? 'sun' : 'moon');
            if (window.lucide) lucide.createIcons();
        }
    }
};

const state = {
    currentPage: 'home',
    jobs: [
        { id: 1, title: 'Frontend Developer', company: 'Google', location: 'Remote', type: 'Full-time', salary: '$140k - $210k', icon: 'zap' },
        { id: 2, title: 'SDE-2 (Backend)', company: 'Amazon', location: 'Seattle, WA', type: 'Full-time', salary: '$160k - $240k', icon: 'server' },
        { id: 3, title: 'Data Scientist', company: 'Microsoft', location: 'Redmond, WA', type: 'Full-time', salary: '$130k - $190k', icon: 'database' },
        { id: 4, title: 'UX Designer', company: 'Apple', location: 'Cupertino, CA', type: 'Contract', salary: '$95k - $150k', icon: 'layout' },
        { id: 5, title: 'DevOps Engineer', company: 'Netflix', location: 'Los Gatos, CA', type: 'Full-time', salary: '$155k - $230k', icon: 'activity' },
        { id: 6, title: 'Mobile Lead (iOS)', company: 'Meta', location: 'Menlo Park, CA', type: 'Full-time', salary: '$180k - $260k', icon: 'smartphone' },
        { id: 7, title: 'Security Analyst', company: 'CrowdStrike', location: 'Austin, TX', type: 'Full-time', salary: '$120k - $185k', icon: 'shield' },
        { id: 8, title: 'Product Manager', company: 'Stripe', location: 'San Francisco, CA', type: 'Full-time', salary: '$145k - $220k', icon: 'package' },
    ],
    prepTopics: [
        { id: 'aptitude', title: 'Aptitude', icon: 'trending-up', description: 'Quantitative, Logical Reasoning, and Verbal Ability for OAs.' },
        { id: 'dsa', title: 'DSA', icon: 'code', description: 'Complete Data Structures and Algorithms from scratch.' },
        { id: 'technical', title: 'Technical', icon: 'cpu', description: 'Core CS fundamentals: OS, DBMS, Networking, and OOPs.' },
        { id: 'hr', title: 'HR Preparation', icon: 'users', description: 'Behavioral questions, STAR method, and cultural fit.' },
        { id: 'da', title: 'Data Analytics', icon: 'bar-chart-2', description: 'SQL, Python, Excel, PowerBI, and Stats for Analysts.' },
        { id: 'sd', title: 'System Design', icon: 'layers', description: 'High Level and Low Level Design for Scalable Apps.' },
    ],
    dsaSheet: [
        {
            topic: 'Arrays & Hashing',
            problems: [
                { title: 'Two Sum', difficulty: 'easy', link: '#' },
                { title: 'Contains Duplicate', difficulty: 'easy', link: '#' },
                { title: 'Group Anagrams', difficulty: 'medium', link: '#' },
                { title: 'Top K Frequent Elements', difficulty: 'medium', link: '#' },
                { title: 'Product of Array Except Self', difficulty: 'medium', link: '#' },
            ]
        },
        {
            topic: 'Trees & Graphs',
            problems: [
                { title: 'Invert Binary Tree', difficulty: 'easy', link: '#' },
                { title: 'Maximum Depth of Binary Tree', difficulty: 'easy', link: '#' },
                { title: 'Binary Tree Level Order Traversal', difficulty: 'medium', link: '#' },
                { title: 'Number of Islands (BFS/DFS)', difficulty: 'medium', link: '#' },
                { title: 'Course Schedule (Topological Sort)', difficulty: 'medium', link: '#' },
                { title: 'Lowest Common Ancestor', difficulty: 'medium', link: '#' },
            ]
        },
        {
            topic: 'Dynamic Programming',
            problems: [
                { title: 'Climbing Stairs', difficulty: 'easy', link: '#' },
                { title: 'Coin Change', difficulty: 'medium', link: '#' },
                { title: 'Longest Common Subsequence', difficulty: 'medium', link: '#' },
                { title: 'Word Break', difficulty: 'medium', link: '#' },
                { title: 'House Robber', difficulty: 'medium', link: '#' },
                { title: 'Edit Distance', difficulty: 'hard', link: '#' },
            ]
        },
        {
            topic: 'Strings & Two Pointers',
            problems: [
                { title: 'Valid Palindrome', difficulty: 'easy', link: '#' },
                { title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', link: '#' },
                { title: 'Character Replacement', difficulty: 'medium', link: '#' },
                { title: 'Minimum Window Substring', difficulty: 'hard', link: '#' },
            ]
        }
    ],
    companies: [
        { name: 'Google', process: '1 Screening + 4 coding rounds + 1 Googliness round', pattern: 'Heavy focus on Graphs, Trees, and Complexity Analysis', syllabus: 'Advanced Algorithms, Sharding, Load Balancers' },
        { name: 'Amazon', process: '1 Online Assessment (Coding + Logic) + 3-4 Video Interviews', pattern: 'Leadership Principles (LP) embedded in every round + DSA', syllabus: 'Greedy, DP, Trees, System Design' },
        { name: 'Microsoft', process: '1 OA + 3-4 Technical Rounds', pattern: 'Mix of DSA and practical problem solving', syllabus: 'Arrays, Strings, Linked Lists, OOPs' },
        { name: 'TCS Digital', process: 'NQT Exam (Aptitude + Advanced Coding) + Technical + HR', pattern: 'Fast-paced coding and basic CS fundamentals', syllabus: 'Basic Maths, Python/Java, DBMS' },
        { name: 'Meta', process: '1 Screening + 2 Coding + 1 System Design + 1 Behavioral', pattern: 'Speed is key. Expect LeetCode Medium/Hard', syllabus: 'Recursion, Sorting, Graph Traversals' },
    ]
};

// Components
const Home = () => `
    <section class="hero animate-fade-in">
        <div class="container">
            <span class="badge" style="margin-bottom: 2rem;">Voted #1 Interview Preparation Platform</span>
            <h1>Launch Your Tech Career With Confidence</h1>
            <p>Master data structures, polish your system design skills, and find jobs at top-tier tech companies all in one place.</p>
            <div class="nav-actions" style="justify-content: center;">
                <button class="btn btn-primary" onclick="navigateTo('jobs')">Browse Jobs</button>
                <button class="btn btn-outline" onclick="navigateTo('prep')">Start Preparing</button>
            </div>
        </div>
    </section>

    <section class="container" style="padding: 6rem 2rem;">
        <div class="section-header">
            <h2>Track Your Progress</h2>
            <p>Our curriculum is designed to take you from a beginner to a pro in under 3 months.</p>
        </div>
        <div class="grid">
            ${state.prepTopics.map(topic => `
                <div class="card prep-card" onclick="navigateTo('${topic.id === 'dsa' ? 'dsa' : 'prep'}')">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem;">
                         <i data-lucide="${topic.icon}" style="width: 40px; height: 40px; color: var(--primary);"></i>
                         <i data-lucide="arrow-up-right" style="width: 20px; height: 20px; color: var(--text-muted);"></i>
                    </div>
                    <h3>${topic.title}</h3>
                    <p style="color: var(--text-muted); margin-top: 1rem; font-size: 0.95rem;">${topic.description}</p>
                </div>
            `).join('')}
        </div>
    </section>

    <section style="background: var(--surface); padding: 6rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
        <div class="container">
            <div style="display: flex; gap: 4rem; align-items: center; justify-content: space-between;">
                <div style="flex: 1;">
                    <span class="badge">Success Stories</span>
                    <h2 style="font-family: var(--font-heading); font-size: 2.5rem; margin: 1.5rem 0;">10,000+ Students Placed in 2025</h2>
                    <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.8;">Our alumni now work at companies like Google, Meta, Amazon, and Netflix. Join the community and start your journey today.</p>
                    <div style="margin-top: 2rem; display: flex; gap: 2rem;">
                        <div>
                            <div style="font-size: 2rem; font-weight: 800; color: var(--primary);">95%</div>
                            <div style="color: var(--text-muted);">Placement Rate</div>
                        </div>
                        <div>
                            <div style="font-size: 2rem; font-weight: 800; color: var(--primary);">$120k</div>
                            <div style="color: var(--text-muted);">Avg. Salary</div>
                        </div>
                    </div>
                </div>
                <div style="flex: 1; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                     <div class="card" style="text-align: center; padding: 2rem;">
                        <i data-lucide="check-circle" style="color: #10b981; margin-bottom: 1rem;"></i>
                        <div style="font-weight: 700;">Verified Quality</div>
                     </div>
                     <div class="card" style="text-align: center; padding: 2rem;">
                        <i data-lucide="users" style="color: var(--primary); margin-bottom: 1rem;"></i>
                        <div style="font-weight: 700;">Expert Mentors</div>
                     </div>
                </div>
            </div>
        </div>
    </section>

    <section class="container" style="padding: 6rem 2rem;">
        <div class="section-header">
            <h2>Hiring Partners</h2>
            <p>Get direct referrals to these top tech giants</p>
        </div>
        <div style="display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; opacity: 0.7;">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 1.5rem;"><i data-lucide="zap"></i> Google</div>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 1.5rem;"><i data-lucide="box"></i> Amazon</div>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 1.5rem;"><i data-lucide="database"></i> Microsoft</div>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 1.5rem;"><i data-lucide="layout"></i> Apple</div>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 1.5rem;"><i data-lucide="server"></i> Netflix</div>
        </div>
    </section>
`;

const Jobs = () => `
    <div class="container animate-fade-in">
        <div class="section-header">
            <h2>Latest Job Openings</h2>
            <p>Discover opportunities from top-tier companies</p>
        </div>
        <div class="grid">
            ${state.jobs.map(job => `
                <div class="card job-card">
                    <div class="company-info">
                        <div class="company-logo">
                            <i data-lucide="${job.icon}"></i>
                        </div>
                        <div>
                            <h3>${job.title}</h3>
                            <p style="color: var(--primary); font-weight: 600;">${job.company}</p>
                        </div>
                    </div>
                    <div class="job-meta">
                        <span><i data-lucide="map-pin" style="width: 14px; display: inline; vertical-align: middle;"></i> ${job.location}</span>
                        <span><i data-lucide="clock" style="width: 14px; display: inline; vertical-align: middle;"></i> ${job.type}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 700;">${job.salary}</span>
                        <button class="btn btn-primary btn-sm" style="padding: 0.4rem 1rem; font-size: 0.8rem;">Apply</button>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
`;

const DSASheet = () => `
    <div class="container animate-fade-in">
        <div class="section-header">
            <h2>Ultimate DSA Cheat Sheet</h2>
            <p>The most important problems for top tech interviews</p>
        </div>
        <div class="dsa-sheet">
            ${state.dsaSheet.map(group => `
                <div class="topic-group">
                    <div class="topic-header">
                        <h3 style="font-family: var(--font-heading);">${group.topic}</h3>
                        <span class="badge">${group.problems.length} Problems</span>
                    </div>
                    <div class="problem-list">
                        ${group.problems.map(p => `
                            <div class="problem-item">
                                <span style="font-weight: 500;">${p.title}</span>
                                <div style="display: flex; align-items: center; gap: 1.5rem;">
                                    <span class="difficulty ${p.difficulty}">${p.difficulty}</span>
                                    <button class="btn btn-outline" style="padding: 0.25rem 0.75rem;"><i data-lucide="play" style="width: 14px;"></i></button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
`;

const Companies = () => `
    <div class="container animate-fade-in">
        <div class="section-header">
            <h2>Company Hiring Insights</h2>
            <p>Know what to expect before you apply</p>
        </div>
        <div class="grid" style="grid-template-columns: 1fr;">
            ${state.companies.map(c => `
                <div class="card" style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
                    <div style="border-right: 1px solid var(--border); padding-right: 2rem;">
                        <h3 style="font-size: 1.8rem; margin-bottom: 1rem; color: var(--primary);">${c.name}</h3>
                        <p><strong>Hiring Process:</strong><br>${c.process}</p>
                    </div>
                    <div>
                        <p style="margin-bottom: 1rem;"><strong>Exam Pattern:</strong><br>${c.pattern}</p>
                        <p><strong>Common Syllabus:</strong><br>${c.syllabus}</p>
                        <button class="btn btn-primary" style="margin-top: 2rem;">View Full Guide</button>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
`;

// Components Enhancement with More Content
const Prep = () => `
    <div class="container animate-fade-in">
        <div class="section-header">
            <h2>Deep Dive Preparation</h2>
            <p>Curated notes and practice problems for every topic</p>
        </div>
        <div class="grid">
            <!-- Aptitude Section -->
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <span class="badge">Aptitude</span>
                    <i data-lucide="trending-up" class="text-primary"></i>
                </div>
                <h3>Mastering Quants</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">Comprehensive guides for competitive exams and interviews.</p>
                <ul class="content-list">
                    <li><strong>Number Systems:</strong> GCD/LCM, Unit Digit, Divisibility.</li>
                    <li><strong>Arithmetic:</strong> Percentage, Profit/Loss, SI & CI.</li>
                    <li><strong>Modern Math:</strong> Permutation, Combination, Probability.</li>
                    <li><strong>Logical:</strong> Syllogisms, Blood Relations, Seating.</li>
                </ul>
                <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;">
                    <button class="btn btn-outline" style="flex: 1;">Study Notes</button>
                    <button class="btn btn-primary" style="flex: 1;">Practice</button>
                </div>
            </div>

            <!-- Technical Section -->
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <span class="badge">Core Tech</span>
                    <i data-lucide="cpu" class="text-primary"></i>
                </div>
                <h3>Computer Science Fundamentals</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">The foundation of every technical interview.</p>
                <ul class="content-list">
                    <li><strong>OS:</strong> Paging, Segmentation, Scheduling, Deadlocks.</li>
                    <li><strong>DBMS:</strong> SQL Queries, Normalization, ACID, Indexing.</li>
                    <li><strong>Networking:</strong> TCP/IP, DNS, HTTP/S, Load Balancers.</li>
                    <li><strong>OOPs:</strong> Polymorphism, Inheritance, Design Patterns.</li>
                </ul>
                <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;">
                    <button class="btn btn-outline" style="flex: 1;">Interview QA</button>
                    <button class="btn btn-primary" style="flex: 1;">Mock Test</button>
                </div>
            </div>

            <!-- HR Section -->
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <span class="badge">Behavioral</span>
                    <i data-lucide="users" class="text-primary"></i>
                </div>
                <h3>HR & Cultural Fit</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">Learn to communicate your impact effectively.</p>
                <ul class="content-list">
                    <li><strong>Introduction:</strong> The perfect 60-second elevator pitch.</li>
                    <li><strong>Conflict Resolution:</strong> Mastering the STAR method.</li>
                    <li><strong>Salary Negotiation:</strong> Tips for getting the best offer.</li>
                    <li><strong>Company Culture:</strong> How to research and align.</li>
                </ul>
                <div style="display: flex; gap: 0.5rem; margin-top: 1.5rem;">
                    <button class="btn btn-outline" style="flex: 1;">Cheat Sheet</button>
                    <button class="btn btn-primary" style="flex: 1;">Videos</button>
                </div>
            </div>
        </div>
        
        <div class="section-header" style="margin-top: 4rem;">
            <h2>Top Practice Problems</h2>
            <p>Hand-picked challenges by industry experts</p>
        </div>
        <div class="topic-group">
            <div class="problem-item">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600;">System Design: Design Rate Limiter</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">Topic: Distributed Systems</span>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span class="difficulty hard">Hard</span>
                    <button class="btn btn-outline btn-sm"><i data-lucide="external-link"></i></button>
                </div>
            </div>
            <div class="problem-item">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600;">SQL: N-th Highest Salary with Window Functions</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">Topic: Databases</span>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span class="difficulty medium">Medium</span>
                    <button class="btn btn-outline btn-sm"><i data-lucide="external-link"></i></button>
                </div>
            </div>
        </div>
    </div>
`;

// Router
function render() {
    const main = document.getElementById('main-content');
    if (!main) return;

    try {
        switch (state.currentPage) {
            case 'home': main.innerHTML = Home(); break;
            case 'jobs': main.innerHTML = Jobs(); break;
            case 'prep': main.innerHTML = Prep(); break;
            case 'dsa': main.innerHTML = DSASheet(); break;
            case 'companies': main.innerHTML = Companies(); break;
            default: main.innerHTML = Home();
        }
    } catch (err) {
        console.error("Render error:", err);
        main.innerHTML = `<div class='container' style='padding: 2rem;'><h2>Something went wrong</h2><p>${err.message}</p></div>`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === state.currentPage);
    });

    if (window.lucide) {
        try {
            lucide.createIcons();
        } catch (e) {
            console.warn("Lucide failed:", e);
        }
    }
}

function navigateTo(page) {
    state.currentPage = page;
    window.location.hash = page;
    render();
}

// Global exposure
window.navigateTo = navigateTo;

function init() {
    themeManager.init();

    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'jobs', 'prep', 'dsa', 'companies'].includes(hash)) {
        state.currentPage = hash;
    }

    render();

    // Nav listeners
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.getAttribute('data-page'));
        });
    });

    const homeNav = document.getElementById('nav-home');
    if (homeNav) {
        homeNav.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
        });
    }
}

// Ensure execution
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle back/forward
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== state.currentPage) {
        state.currentPage = hash;
        render();
    }
});
