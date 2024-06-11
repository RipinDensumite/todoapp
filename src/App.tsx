import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Users {
  name: string,
  email: string,
  age: number | string,
  imageID?: string,
  id?: string,
}

const url = "http://pocketbase-r8gcw4c.172.104.164.95.sslip.io/api/collections/visitors/records"

function App() {
  const [users, setUsers] = useState<Users[]>([])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(url);
        console.log(response); // Log for response object
        // Map over the items array and return a new object for each user
        const newUsers = response.data.items.map((item: Users) => ({
          name: item.name,
          email: item.email,
          age: item.age,
          imageID: item.imageID ? `http://pocketbase-r8gcw4c.172.104.164.95.sslip.io/api/files/qpx32z7o2oovq36/${item.id}/${item.imageID}?token=` : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
        }));
        // Update the users state with the new users
        console.log(newUsers) // logs for response array
        setUsers(newUsers);
        isLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    getUser()
  }, [users])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://pocketbase-r8gcw4c.172.104.164.95.sslip.io/api/collections/visitors/records", {
        name: name,
        email: email,
        age: age,
      });
      console.log(response);
      // Update the users state with the new user
      setUsers([...users, { name: name, email: email, age: age }]);
      toast("New user appear", {
        description: "The user has been added successfully!"
      })
      setName("");
      setEmail("");
      setAge("");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <section className="flex flex-col items-center min-h-screen space-y-5 sm:m-10 overflow-auto">
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>User input<span> - api test</span></CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="age" value={age} onChange={(e) => setAge(e.target.value)} />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>

        <div className="w-full flex justify-center flex-wrap p-4">
          {!loading ? users.map((user, index) => {
            return (
              <Card key={user.email} className="shadow-2xl bg-stone-800 text-white w-80 m-3">
                <CardHeader>
                  <div className="flex flex-row items-center space-x-4">
                    <Avatar className="size-14">
                      <AvatarImage src={user.imageID} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardTitle>{user.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Email : {user.email}</p>
                  <p>Age : {user.age}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <p>{index + 1}</p>
                </CardFooter>
              </Card>
            );
          }) : <p>Loading...</p>}
        </div>
      </section >
    </>
  )
}

export default App
