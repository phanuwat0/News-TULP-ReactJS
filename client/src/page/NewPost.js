import { Form, redirect, useNavigate } from "react-router-dom";
import "./NewPost.css";
import { createPost } from "../utils/newPostsData";
import { useState } from "react";

export async function newAction({ request, params }) {
  const formData = await request.formData();
  let post = Object.fromEntries(formData);
  console.log("new action", post);
  post = { id: params.id, ...post };
  await createPost(post);
  return redirect("/home/");
}

export default function NewPost() {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
  };

  return (
    <Form replace method="post" className="post-form">
      <hr />
      <label>
        <span>Name:</span>
        <input placeholder="Name" type="text" name="name" required />
      </label>
      <label>
        <label>
          <span>Image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>
        
        <input type="text" name="img" value={imageUrl} />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Selected"
            style={{ width: "auto", height: "auto" }}
          />
        )}
      </label>
      <label>
        <span>
          Deadline:
          <p>
            Date :
            <input type="date" name="date" required />
          </p>
          <p>
            Time :
            <input
              type="time"
              name="time"
              step="60"
              pattern="[0-9]{2}:[0-9]{2}"
              min="00:00"
              max="23:59"
              required
            />
          </p>
        </span>
      </label>
      <label>
        <span>Category:</span>
        <span>
          <input
            type="radio"
            name="category"
            value={"กิจกรรม"}
            defaultChecked
          />
          กิจกรรม
        </span>
        <span>
          <input type="radio" name="category" value={"ทุนการศึกษา"} />{" "}
          ทุนการศึกษา
        </span>
        <span>
          <input type="radio" name="category" value={"ข่าวสาร"} /> ข่าวสาร
        </span>
      </label>
      <label>
        <span>Detail:</span> <textarea name="details" rows={6} />
      </label>
      <label>
        <span>Link:</span>
        <input placeholder="Link" type="text" name="link" required />
      </label>
      <label>
        <span>aculty:</span>
        <select className="faculty" name="faculty" required>
          <option value="all">คณะทั้งหมด</option>
          <option value="law">คณะนิติศาสตร์</option>
          <option value="college">วิทยาลัยสหวิทยาการ</option>
          <option value="social">คณะสังคมสงเคราะห์ศาสตร์</option>
          <option value="fine">คณะศิลปกรรมศาสตร์</option>
          <option value="public">คณะสาธารณสุขศาสตร์</option>
          <option value="science">คณะวิทยาศาสตร์และเทคโนโลยี</option>
        </select>
      </label>

      <p>
        <button className="save" type="submit">
          Save{" "}
        </button>
        <button
          className="button"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
