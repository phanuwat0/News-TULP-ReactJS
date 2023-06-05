import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import Post from "./Post";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const category = searchParams.get("category");
  const faculty = searchParams.get("faculty"); // เพิ่มตรงนี้
  console.log(q, category, faculty);
  const submit = useSubmit();

  const resetSearch = (e) => {
    const param = searchParams.get("q");
    const categoryParam = searchParams.get("category");
    const facultyParam = searchParams.get("faculty"); // เพิ่มตรงนี้
    if (param || categoryParam || facultyParam) {
      searchParams.delete("q");
      searchParams.delete("category");
      searchParams.delete("faculty"); // เพิ่มตรงนี้
      setSearchParams(searchParams);
    }
  };

  const posts = useLoaderData();

  let filteredPosts = posts;
  if (q) {
    filteredPosts = filteredPosts.filter(
      (e) =>
        e.name.toLowerCase().includes(q.toLowerCase()) ||
        e.details.toLowerCase().includes(q.toLowerCase())
    );
  }
  if (category && category !== "") {
    filteredPosts = filteredPosts.filter((e) =>
      e.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  if (faculty &&faculty !=="") {
    // เพิ่มตรงนี้
    filteredPosts = filteredPosts.filter((e) =>
      e.faculty.toLowerCase().includes(faculty.toLowerCase())
    );
  }

  const list =
    filteredPosts && filteredPosts.length > 0
      ? filteredPosts.map((e) => <Post key={e.id} post={e} />)
      : null;

  return (
    <>
      <Form id="search-form" role="search">
        <fieldset>
          <legend></legend>
          <input
            id="q"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={q}
            onChange={(event) => {
              submit(event.currentTarget.form);
            }}
          />

          <input type="reset" onClick={resetSearch} />
        </fieldset>
        <select
          id="category"
          name="category"
          defaultValue={category}
          onChange={(event) => {
            submit(event.currentTarget.form);
          }}
        >
          <option value="">หมวดหมู่ทั้งหมด</option>
          <option value="ข่าวสาร">ข่าวสาร</option>
          <option value="ทุนการศึกษา">ทุนการศึกษา</option>
          <option value="กิจกรรม">กิจกรรม</option>
        </select>
        <select
          id="faculty"
          name="faculty"
          defaultValue={faculty}
          onChange={(event) => {
            submit(event.currentTarget.form);
          }}
        >
          <option value="">คณะทั้งหมด</option>
          <option value="law">คณะนิติศาสตร์</option>
          <option value="college">วิทยาลัยสหวิทยาการ</option>
          <option value="social">คณะสังคมสงเคราะห์ศาสตร์</option>
          <option value="fine">คณะศิลปกรรมศาสตร์</option>
          <option value="public">คณะสาธารณสุขศาสตร์</option>
          <option value="science">คณะวิทยาศาสตร์และเทคโนโลยี</option>
        </select>
      </Form>
      <div>
        {list ? (
          list
        ) : (
          <p>No posts found. Try adjusting your search filters.</p>
        )}
      </div>
    </>
  );
};

export default HomePage;

export const homeLoader = async () => {
  // const res = await getPosts();
  const res = await fetch("/api/home/");
  if (!res.ok) {
    throw Error("Could not fetch the posts");
  }
  return res.json();
};
