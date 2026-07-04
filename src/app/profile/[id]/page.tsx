
export default async function UserProfile({params}:{
  params: Promise<{ id: string }>;
})
{  
  const {id}=await params;
  
  return (
    <div className='flex *:flex-col items-center justify-center h-screen bg-gray-900'>
      <h1>Profile</h1>
      <hr />
      <p className="text-2xl">Profile Id :{id}</p>

    </div>
  )
}