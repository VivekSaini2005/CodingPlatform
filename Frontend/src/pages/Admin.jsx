import React from 'react';
import { Plus, Edit, Trash2, Video, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Admin() {
  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
      description: 'Add a new coding problem to the platform with full details and test cases.',
      icon: Plus,
      route: '/admin/create',
    },
    {
      id: 'update',
      title: 'Update Problem',
      description: 'Modify existing problem descriptions, test cases, or constraints.',
      icon: Edit,
      route: '/admin/update',
    },
    {
      id: 'delete',
      title: 'Delete Problem',
      description: 'Permanently remove a problem from the coding platform.',
      icon: Trash2,
      route: '/admin/delete',
    },
    {
      id: 'video',
      title: 'Video Solutions',
      description: 'Manage and upload video explanations for problems.',
      icon: Video,
      route: '/admin/video',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-black dark:text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex mb-4 p-4 rounded-xl border border-gray-200 dark:border-[#2f2f2f] bg-white dark:bg-[#262626]">
            <Zap className="w-7 h-7 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage platform problems, test cases, and editorial resources from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <NavLink key={option.id} to={option.route} className="block h-full">
                <div className="h-full bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#2f2f2f] rounded-xl p-5 flex flex-col gap-4 transition-colors hover:border-[#3a3a3a]">
                  <div className="w-12 h-12 rounded-xl border border-gray-200 dark:border-[#2f2f2f] bg-gray-100 dark:bg-[#2a2a2a] flex items-center justify-center">
                    <IconComponent size={22} className="text-gray-800 dark:text-gray-200" />
                  </div>
                  <h2 className="text-xl font-semibold text-black dark:text-white">{option.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm grow">{option.description}</p>
                  <div className="w-full rounded-xl border border-gray-200 dark:border-[#2f2f2f] bg-gray-100 dark:bg-[#2a2a2a] p-4 text-sm text-gray-700 dark:text-gray-300">
                    Access {option.title.split(' ')[0]} ?
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
