import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../../api/axiosInstance';
import { useNavigate } from 'react-router';
import { useState } from 'react';

// --------------------
// Language Config
// --------------------
const LANGUAGES = ['C++', 'Java', 'JavaScript', 'Python'];

// --------------------
// Zod Schema
// --------------------
const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['Array', 'LinkList', 'Graph', 'DP', 'Math']),

  explainTestCase: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required'),
    })
  ).min(1),

  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required'),
    })
  ).min(1),

  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1)
    })
  ).min(1),

  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript', 'Python']),
      initialCode: z.string().min(1)
    })
  ).length(4),

  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript', 'Python']),
      completeSolution: z.string().min(1)
    })
  ).length(4)
});

function CreateProblem() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [collapsedVisible, setCollapsedVisible] = useState({})
  const [collapsedHidden, setCollapsedHidden] = useState({})
  const [collapsedExample, setCollapsedExample] = useState({})

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      startCode: LANGUAGES.map(lang => ({
        language: lang,
        initialCode: ''
      })),
      referenceSolution: LANGUAGES.map(lang => ({
        language: lang,
        completeSolution: ''
      }))
    }
  });

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } =
    useFieldArray({ control, name: 'visibleTestCases' });

  const { fields: hiddenFields, append: appendHidden, remove: removeHidden } =
    useFieldArray({ control, name: 'hiddenTestCases' });

  const { fields: exampleFields, append: appendExample, remove: removeExample } =
    useFieldArray({ control, name: "explainTestCase" });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // console.log("prob creating ...")
      // console.log(data);
      await axiosClient.post('/problem/create', data);
      // console.log("problem created");
      alert('Problem Created Successfully 🚀');
      navigate('/admin');
    } catch (error) {
      setSubmitError(
        error.response?.data?.message || 'Failed to create problem'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        <h1 className="text-4xl font-bold text-center text-cyan-700 dark:text-cyan-400 tracking-wide">
          Create New Problem
        </h1>

        {submitError && (
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* ---------------- Basic Info ---------------- */}
          <div className="bg-white dark:bg-gray-800/60 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
              Basic Information
            </h2>

            <input
              {...register('title')}
              placeholder="Problem Title"
              className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-cyan-500 dark:focus:border-cyan-400 outline-none"
            />

            <textarea
              {...register('description')}
              placeholder="Problem Description"
              rows={5}
              className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-cyan-500 dark:focus:border-cyan-400 outline-none"
            />

            <div className="flex gap-4">
              <select
                {...register('difficulty')}
                className="flex-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <select
                {...register('tags')}
                className="flex-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700"
              >
                <option value="Array">Array</option>
                <option value="LinkList">Linked List</option>
                <option value="Graph">Graph</option>
                <option value="DP">DP</option>
                <option value="Math">Math</option>
              </select>
            </div>
            {/* ---------------- Examples ---------------- */}
            <div className="bg-white dark:bg-gray-800/60 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">

              <h2 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
                Example Test Cases
              </h2>

              <button
                type="button"
                onClick={() =>
                  appendExample({
                    input: "",
                    output: "",
                    explanation: ""
                  })
                }
                className="mb-3 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
              >
                Add Example
              </button>

              {exampleFields.map((field, index) => (
                <div key={field.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4 border border-gray-300 dark:border-gray-700">

                  {!collapsedExample[index] && (
                    <div className="space-y-2">

                      <textarea
                        {...register(`explainTestCase.${index}.input`)}
                        placeholder="Input Example"
                        className="w-full p-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg font-mono"
                      />

                      <textarea
                        {...register(`explainTestCase.${index}.output`)}
                        placeholder="Output Example"
                        className="w-full p-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg font-mono"
                      />

                      <textarea
                        {...register(`explainTestCase.${index}.explanation`)}
                        placeholder="Explanation"
                        className="w-full p-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg"
                      />

                      <div className="flex gap-3 mt-2">

                        <button
                          type="button"
                          onClick={() =>
                            setCollapsedExample(prev => ({
                              ...prev,
                              [index]: true
                            }))
                          }
                          className="px-3 py-1 bg-green-500 rounded"
                        >
                          OK
                        </button>

                        <button
                          type="button"
                          onClick={() => removeExample(index)}
                          className="px-3 py-1 bg-red-500 rounded"
                        >
                          Delete
                        </button>

                      </div>

                    </div>
                  )}

                  {collapsedExample[index] && (
                    <div className="flex justify-between items-center">

                      <span className="text-gray-400">
                        Example Test Case #{index + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setCollapsedExample(prev => ({
                            ...prev,
                            [index]: false
                          }))
                        }
                        className="text-cyan-400"
                      >
                        Edit
                      </button>

                    </div>
                  )}

                </div>
              ))}

            </div>


          </div>

          {/* ---------------- Test Cases ---------------- */}
          <div className="bg-white dark:bg-gray-800/60 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">
            <h2 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
              Test Cases
            </h2>

            {/* Visible */}
            <div>
              <button
                type="button"
                onClick={() =>
                  appendVisible({ input: '', output: '', explanation: '', collapsed: false })
                }
                className="mb-3 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg"
              >
                Add Visible Case
              </button>

              {visibleFields.map((field, index) => (
                <div key={field.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4 border border-gray-300 dark:border-gray-700">

                  {!collapsedVisible[index] && (
                    <div className="space-y-2">

                      <textarea
                        {...register(`visibleTestCases.${index}.input`)}
                        placeholder="Input"
                        className="w-full p-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg font-mono"
                      />

                      <textarea
                        {...register(`visibleTestCases.${index}.output`)}
                        placeholder="Output"
                        className="w-full p-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg font-mono"
                      />

                      <textarea
                        {...register(`visibleTestCases.${index}.explanation`)}
                        placeholder="Explanation"
                        className="w-full p-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg"
                      />

                      <div className="flex gap-3 mt-2">

                        <button
                          type="button"
                          onClick={() =>
                            setCollapsedVisible(prev => ({
                              ...prev,
                              [index]: true
                            }))
                          }
                          className="px-3 py-1 bg-green-500 rounded"
                        >
                          OK
                        </button>

                        <button
                          type="button"
                          onClick={() => removeVisible(index)}
                          className="px-3 py-1 bg-red-500 rounded"
                        >
                          Delete
                        </button>

                      </div>

                    </div>
                  )}

                  {collapsedVisible[index] && (
                    <div className="flex justify-between items-center">

                      <span className="text-gray-400">
                        Visible Test Case #{index + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setCollapsedVisible(prev => ({
                            ...prev,
                            [index]: false
                          }))
                        }
                        className="text-cyan-400"
                      >
                        Edit
                      </button>

                    </div>
                  )}

                </div>
              ))}




            </div>

            {/* Hidden */}
            <div>

              <button
                type="button"
                onClick={() =>
                  appendHidden({ input: '', output: '', collapsed: false })
                }
                className="mb-3 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg"
              >
                Add Hidden Case
              </button>

              {hiddenFields.map((field, index) => (
                <div key={field.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg mb-4 border border-gray-300 dark:border-gray-700">

                  {!collapsedHidden[index] && (
                    <div className="space-y-2">

                      <textarea
                        {...register(`hiddenTestCases.${index}.input`)}
                        placeholder="Input"
                        className="w-full p-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg font-mono"
                      />

                      <textarea
                        {...register(`hiddenTestCases.${index}.output`)}
                        placeholder="Output"
                        className="w-full p-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg font-mono"
                      />

                      <div className="flex gap-3 mt-2">

                        <button
                          type="button"
                          onClick={() =>
                            setCollapsedHidden(prev => ({
                              ...prev,
                              [index]: true
                            }))
                          }
                          className="px-3 py-1 bg-green-500 rounded"
                        >
                          OK
                        </button>

                        <button
                          type="button"
                          onClick={() => removeHidden(index)}
                          className="px-3 py-1 bg-red-500 rounded"
                        >
                          Delete
                        </button>

                      </div>

                    </div>
                  )}

                  {collapsedHidden[index] && (
                    <div className="flex justify-between">

                      <span className="text-gray-400">
                        Hidden Test Case #{index + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setCollapsedHidden(prev => ({
                            ...prev,
                            [index]: false
                          }))
                        }
                        className="text-cyan-400"
                      >
                        Edit
                      </button>

                    </div>
                  )}

                </div>
              ))}

            </div>
          </div>

          {/* ---------------- Code Section ---------------- */}
          <div className="bg-white dark:bg-gray-800/60 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 space-y-6">

            <h2 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
              Code Templates & Reference Solutions
            </h2>

            {LANGUAGES.map((lang, index) => (
              <div key={lang} className="space-y-3">

                <h3 className="text-lg font-medium text-purple-600 dark:text-purple-400">
                  {lang}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  <textarea
                    {...register(`startCode.${index}.initialCode`)}
                    placeholder="Initial Code Template"
                    rows={10}
                    className="w-full p-3 bg-white dark:bg-black rounded-lg font-mono border border-gray-300 dark:border-gray-700 focus:border-purple-500 outline-none text-gray-900 dark:text-gray-100"
                  />

                  <textarea
                    {...register(`referenceSolution.${index}.completeSolution`)}
                    placeholder="Reference Solution"
                    rows={10}
                    className="w-full p-3 bg-white dark:bg-black rounded-lg font-mono border border-gray-300 dark:border-gray-700 focus:border-green-500 outline-none text-gray-900 dark:text-gray-100"
                  />

                </div>

              </div>
            ))}

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 rounded-xl font-semibold text-lg transition"
          >
            {isSubmitting ? 'Creating...' : 'Create Problem 🚀'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default CreateProblem;