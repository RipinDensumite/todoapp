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

interface Users {
  name: string,
  email: string,
  age: number | string,
}

const url = "http://pocketbase-r8gcw4c.172.104.164.95.sslip.io/api/collections/visitors/records"

function App() {
  const [users, setUsers] = useState<Users[]>([])

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

  return (
    <>
      <section className="flex flex-col items-center min-h-screen space-y-5 m-10">
        <Card className="">
          <CardHeader>
            <CardTitle>User input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="name" />
            <Input placeholder="email" />
            <Input placeholder="age" />
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
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
