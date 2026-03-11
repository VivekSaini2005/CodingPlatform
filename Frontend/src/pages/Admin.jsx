import React, { useState } from 'react';
import { Plus, Edit, Trash2, Home, RefreshCw, Zap, Video } from 'lucide-react';
import { NavLink } from 'react-router';

function Admin() {
  const [selectedOption, setSelectedOption] = useState(null);

  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
      description: 'Add a new coding problem to the platform with full details and test cases.',
      icon: Plus,
      gradient: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-emerald-500/30',
      route: '/admin/create'
    },
    {
      id: 'update',
      title: 'Update Problem',
      description: 'Modify existing problem descriptions, test cases, or constraints.',
      icon: Edit,
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'shadow-amber-500/30',
      route: '/admin/update'
    },
    {
      id: 'delete',
      title: 'Delete Problem',
      description: 'Permanently remove a problem from the coding platform.',
      icon: Trash2,
      gradient: 'from-rose-400 to-red-500',
      shadow: 'shadow-red-500/30',
      route: '/admin/delete'
    },
    {
      id: 'video',
      title: 'Video Solutions',
      description: 'Manage and upload video explanations for problems.',
      icon: Video,
      gradient: 'from-indigo-400 to-cyan-500',
      shadow: 'shadow-indigo-500/30',
      route: '/admin/video'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-200 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-teal-600/20 blur-[120px]"></div>
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-block mb-4 p-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
            <Zap className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
            Admin Dashboard
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
            Take full control of the coding platform. Manage problems, verify test cases, and curate the best learning experience.
          </p>
        </div>

        {/* Admin Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <NavLink
                to={option.route}
                key={option.id}
                className="group relative h-full block"
              >
                {/* Glow bridge */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${option.gradient} rounded-3xl blur opacity-25 group-hover:opacity-60 transition duration-500`}></div>

                {/* Card Content */}
                <div className="relative h-full bg-slate-50/90 dark:bg-[#1e293b]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col items-center text-center transition-transform duration-500 hover:-translate-y-2">

                  {/* Icon Container */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${option.gradient} shadow-lg ${option.shadow} text-white transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <IconComponent size={28} strokeWidth={2.5} />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-400 transition-colors">
                    {option.title}
                  </h2>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light mb-6 flex-grow">
                    {option.description}
                  </p>

                  {/* Fake Button inside Link for visual appeal */}
                  <div className="w-full py-3 px-4 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300 group-hover:bg-slate-300/50 dark:group-hover:bg-white/10 group-hover:text-slate-900 dark:group-hover:text-white transition-all">
                    Access {option.title.split(' ')[0]} &rarr;
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admin;