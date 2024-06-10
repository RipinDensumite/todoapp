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

interface Users {
  name: string,
  email: string,
  age: number | string,
}

const url = "http://pocketbase-r8gcw4c.172.104.164.95.sslip.io/api/collections/visitors/records"

function App() {
  const [users, setUsers] = useState<Users[]>([])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        // Map over the items array and return a new object for each user
        const newUsers = response.data.items.map((item: Users) => ({
          name: item.name,
          email: item.email,
          age: item.age,
        }));
        // Update the users state with the new users
        setUsers(newUsers);
      } catch (error) {
        console.log(error);
      }
    }

    getUser()
  }, [])

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
      <section className="flex flex-col items-center min-h-screen space-y-5 m-10">
        <Card className="">
          <CardHeader>
            <CardTitle>User input</CardTitle>
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

        {users.map((user, index) => {
          return (
            <Card key={user.email} className="shadow-lg">
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
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
        })}
      </section>
    </>
  )
}

export default App
