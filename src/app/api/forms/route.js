import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const formId = searchParams.get("formId");
    const publicForm = searchParams.get("public");

    console.log(publicForm)
    if ((publicForm == "true" || publicForm == true) && formId) {
      console.log("got here")
      const pform = await prisma.form.findFirst({
        where: {
          id: formId,
          type: true
        }
      });
      pform.content = JSON.parse(pform.content);
      return NextResponse.json({ success: true, data: pform });
    }
    console.log("got late")

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    // Checking if Session exists
    if (!session) {
      // return NextResponse.json({ error: "Unauthorized!" }, { status: 500 });
    }

    if (!email && !formId) {
      return NextResponse.json({ error: "Email or FormID is required!" }, { status: 500 });
    }
    // Make sure user is getting his own form/s
    if (email && session && session.email !== email) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 500 });
    }
    
    // For Getting one form using ID
    if (formId) {
      const form = await prisma.form.findFirst({
        where: {
          id: formId,
          userEmail: session.email
        }
      });
      return NextResponse.json({ success: true, data: form });
    }
    
    // Assuming you have a User model with forms relation
    const allForms = await prisma.form.findMany({
      where: {
        userEmail: email
      }
    })

    // console.log()
    return NextResponse.json({ success: true, data: allForms });

  } catch (error) {
    console.log('error', error);
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    // Checking if Session exists
    if (!session) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 500 });
    }

    console.log("====================================")
    const { email, formData } = await req.json();
    // Fetch the existing user (including forms)
    if (!email) {
      return NextResponse.json({ error: "No Email Found" }, { status: 500 });
    }
    // Make sure user is making his own form/s
    if (email && session.email !== email) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 500 });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    
    // Update or create a form based on formName
    let updatedForm;
    const existingForm = existingUser?.forms?.find(form => form.name == JSON.parse(formData?.formName)) ?? null;
    
    if (existingForm) {
      // Check if the email of user of existing form is same as this users email or not
    } else {
      const updatedForm = await prisma.form.create({
        data: {
          name: formData?.formName,
          content: JSON.stringify(formData),
          user: {
            connect: {
              email: email,
            },
          },
        },
      });         
    }

    return NextResponse.json({ success: true, data: updatedForm });

  } catch (error) {
    console.error("Error in POST API route:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  
    // Checking if Session exists
    if (!session) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 500 });
    }

    const { id, name, content, userEmail } = await req.json();

    if (!id || id=="" || !userEmail || userEmail=="") {
      return NextResponse.json(
        { error: "Form ID or User Email is missing!" },
        { status: 500 }
      );
    }
    // Make sure user is updating his own form/s
    if (userEmail && session.email !== userEmail) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 500 });
    }

    const updateForm = await prisma.form.update({
      where: {
        id: id
      },
      data: {
        name: name,
        content: content
      }
    })

    return NextResponse.json({ success: true, data: updateForm });
  } catch (error) {
    return NextResponse.json(
      { error: "Some error occured! "+error },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    // Checking if Session exists
    if (!session) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const formId = searchParams.get("formId");
    
    if (!formId || formId=="") {
      return NextResponse.json(
        { error: "Form ID missing!" },
        { status: 500 }
      );
    }

    const deleteForm = await prisma.form.delete({
      where: {
        id: formId,
        userEmail: session.email
      },
    })

    return NextResponse.json({ success: true, data: deleteForm });
  } catch (error) {
    console.error("Error in DELETE API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

