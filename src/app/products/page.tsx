
import { createSupabaseServerClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Card from '@/components/common/Card'
export default async function Page() {
  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  const { data: categories, error } = await supabase.from('categories').select('*');

  if (error) {
    console.error('Error fetching categories:', error.message);
  }

  console.log(categories);

  return (
    <main className='grid grid-cols-4'>
      {categories?.map((category) => (
        <Card category={category} />
      ))}
    </main>
  )
}
